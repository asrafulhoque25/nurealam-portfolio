gsap.registerPlugin(ScrollTrigger);

//  Navigation
window.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const iconHamburger = document.getElementById("iconHamburger");
    const iconClose = document.getElementById("iconClose");

    let isOpen = false;

    // initial states
    gsap.set(mobileMenu, { height: 0, opacity: 0 });

    gsap.set(iconClose, {
        opacity: 0,
        scale: 0.6,
        rotate: -90
    });

    gsap.set(iconHamburger, {
        opacity: 1,
        scale: 1,
        rotate: 0
    });

    menuBtn.addEventListener("click", () => {

        if (!isOpen) {

            gsap.to(mobileMenu, {
                height: "auto",
                opacity: 1,
                duration: 0.5,
                ease: "power3.out"
            });

            gsap.to(iconHamburger, {
                opacity: 0,
                scale: 0.6,
                rotate: 90,
                duration: 0.25
            });

            gsap.to(iconClose, {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 0.35,
                delay: 0.1
            });

        } else {

            gsap.to(mobileMenu, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.in"
            });

            gsap.to(iconClose, {
                opacity: 0,
                scale: 0.6,
                rotate: -90,
                duration: 0.25
            });

            gsap.to(iconHamburger, {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 0.35,
                delay: 0.1
            });
        }

        isOpen = !isOpen;
    });

});




// Sticky scroll 
// ── Nav pill progress border ──
const siteHeader  = document.querySelector("header");
const navLogo     = document.getElementById("navLogo");
const navRight    = document.getElementById("navRight");
const navPillWrap = document.getElementById("navPillWrap");
const navPill     = document.getElementById("navPill");

let ringPath, trackPath, totalLen, isScrolled = false;

function buildProgressRing() {
    const rect = navPill.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (w === 0 || h === 0) return;
    const r = h / 2;

    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "progress-ring");
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.style.cssText = `inset:0px;width:${w}px;height:${h}px;`

    // Gradient
    const defs = document.createElementNS(ns, "defs");
    const grad = document.createElementNS(ns, "linearGradient");
    grad.setAttribute("id", "navGrad");
    grad.setAttribute("x1", "0%"); grad.setAttribute("x2", "100%");
    ["0%:#6b5ce7", "100%:#a78bfa"].forEach(s => {
        const [offset, color] = s.split(":");
        const stop = document.createElementNS(ns, "stop");
        stop.setAttribute("offset", offset);
        stop.setAttribute("stop-color", color);
        grad.appendChild(stop);
    });
    defs.appendChild(grad);
    svg.appendChild(defs);

    // Track (faint background ring)
    trackPath = document.createElementNS(ns, "rect");
    Object.entries({ x:1, y:1, width:w-2, height:h-2, rx:r-1, ry:r-1,
        fill:"none", stroke:"rgba(107,92,231,0.12)", "stroke-width":"1.5" })
        .forEach(([k,v]) => trackPath.setAttribute(k, v));
    trackPath.style.cssText = "opacity:0;transition:opacity 0.4s;";
    svg.appendChild(trackPath);

    // Progress stroke
    ringPath = document.createElementNS(ns, "rect");
    Object.entries({ x:1, y:1, width:w-2, height:h-2, rx:r-1, ry:r-1,
        fill:"none", stroke:"url(#navGrad)", "stroke-width":"2", "stroke-linecap":"round" })
        .forEach(([k,v]) => ringPath.setAttribute(k, v));

    totalLen = 2 * ((w-2) + (h-2) - 4*(r-1)) + 2 * Math.PI * (r-1);
    ringPath.style.cssText = `
        stroke-dasharray:${totalLen};
        stroke-dashoffset:${totalLen};
        opacity:0;
        transition:stroke-dashoffset 0.12s linear, opacity 0.4s;
    `;
    svg.appendChild(ringPath);
    navPillWrap.appendChild(svg);
}

// Build after DOM ready
window.addEventListener("DOMContentLoaded", () => {
     requestAnimationFrame(() => {
        buildProgressRing();

          setTimeout(() => {
        buildProgressRing();
    }, 100);
    });

  window.addEventListener("scroll", () => {
    if (!ringPath || !trackPath) return;

    const st  = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(st / max, 1);
    const scrolled = st > 50;

    if (scrolled !== isScrolled) {
        isScrolled = scrolled;
        siteHeader.classList.toggle("scrolled", scrolled);
        navLogo.classList.toggle("scrolled", scrolled);
        navRight.classList.toggle("scrolled", scrolled);
        ringPath.style.opacity  = scrolled ? "1" : "0";
        trackPath.style.opacity = scrolled ? "1" : "0";
    }

    if (scrolled) {
        ringPath.style.strokeDashoffset = totalLen * (1 - pct);
    }
});

});





// ──======================================= Smooth scroll (Lenis)======================================== ──
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.3,
    infinite: false,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}


// Slides
// for stats section, using Splide.js with auto-scroll extension
document.addEventListener('DOMContentLoaded', function () {
  new Splide('#stats-slider', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    perPage: 1,
    breakpoints: {
      1280: {
        perPage: 3,  
      },
      1024: {
        perPage: 2,  
      },
      768: {
        perPage: 1,  
      },
    },
    gap: '20px',
    arrows: false,
    pagination: false,
    autoScroll: {
      speed: 1,
      pauseOnHover: false,
      pauseOnFocus: false,
    },
  }).mount(window.splide.Extensions);
});

// for testimonial section,
// Slides
document.addEventListener('DOMContentLoaded', function () {
  new Splide('#testimonial-splide', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    perPage: 4, // Default for large screens
    gap: '20px',
    arrows: false,
    pagination: false,
    autoScroll: {
      speed: 1,
      pauseOnHover: false,
      pauseOnFocus: false,
    },
    breakpoints: {
      1280: { // Below 1280px (laptop)
        perPage: 3,
        gap: '16px',
      },
      1024: { // Below 1024px (tablet)
        perPage: 2,
        gap: '14px',
      },
      640: { // Below 640px (mobile)
        perPage: 1,
        gap: '10px',
      },
    },
  }).mount(window.splide.Extensions);
});



// service section

const rows = document.querySelectorAll(".service-row");

rows.forEach((row) => {
  row.addEventListener("click", () => {

    // Only mobile
    if (window.innerWidth < 768) {

      const isActive = row.classList.contains("active");

      // close all
      rows.forEach(r => r.classList.remove("active"));

      // open current
      if (!isActive) {
        row.classList.add("active");
      }
    }

  });
});


// projects view sticky button 

const btn = document.getElementById("viewProjectBtn");
const cards = document.querySelectorAll(".featured-card");

// smoother GSAP setters (key improvement)
const xTo = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3.out" });
const yTo = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3.out" });

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      opacity: 0,
      scale: 0.8,
      duration: 0.25,
      ease: "power2.out"
    });
  });

  card.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });
});



// text-scrub
document.addEventListener("DOMContentLoaded", () => {
   
    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    
    const scrubTextElements = document.querySelectorAll('.scrub-text');

    scrubTextElements.forEach(scrubTextElement => {
        
        const words = scrubTextElement.innerText.split(' ');
        scrubTextElement.innerHTML = '';

        words.forEach(word => {
            const span = document.createElement('span');
            span.innerText = word + ' ';
            
            span.style.color = '#E5E7EB'; // Tailwind gray-200
            scrubTextElement.appendChild(span);
        });

        const spans = scrubTextElement.querySelectorAll('span');

        
        gsap.to(spans, {
            color: '#111827', 
            stagger: 0.1,
            scrollTrigger: {
                trigger: scrubTextElement,
                start: "top 80%",   
                end: "bottom 40%", 
                scrub: 1,         
            }
        });
    });
});


// 






// banner animation 
window.addEventListener("DOMContentLoaded", () => {

    const bgTextEl = document.getElementById('bg-name-text');
    if (!bgTextEl) return;

    bgTextEl.textContent = 'NURE ALAM';

    const letters = 'NURE ALAM'.split('');
    bgTextEl.innerHTML = letters
        .map(char =>
            char === ' '
                ? `<span class="bg-letter bg-letter--space">&nbsp;</span>`
                : `<span class="bg-letter">${char}</span>`
        )
        .join('');

    // CSS এ hide নেই তাই GSAP set দিয়ে hide করো
    gsap.set('.bg-letter:not(.bg-letter--space)', { 
        yPercent: 110, 
        opacity: 0 
    });

    const bannerTl = gsap.timeline({
        defaults: { ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    });

    bannerTl.to('.bg-letter:not(.bg-letter--space)', {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: { each: 0.06, ease: 'power2.out' }
    });

    bannerTl.call(() => {
        document.querySelectorAll('.bg-letter').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    });

    bannerTl.to('.content-panel', {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15
    }, '+=0.1');

    bannerTl.to('.image-card', {
        autoAlpha: 1,
        y: 0,
        duration: 0.7
    }, '<0.2');






    // Banner scroll animation — 

ScrollTrigger.create({
    trigger: '.banner-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
        const progress = self.progress;
        const letters = document.querySelectorAll('.bg-letter:not(.bg-letter--space)');

        letters.forEach((el, i) => {
            const delay = i * 0.04;
            const localProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));

            gsap.set(el, {
                yPercent: -(localProgress * 120),
                opacity: 1 - localProgress,
            });
        });
    }
});

});