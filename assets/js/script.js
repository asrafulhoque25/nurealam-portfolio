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



  // gsap.to('#bg-name-text', {
  //   backgroundPosition: '300% center',
  //   duration: 6,
  //   ease: 'none',
  //   repeat: -1,
  //   yoyo: false,
  // });

  // /* ── GSAP: entrance animations ── */
  // gsap.from('.content-panel', {
  //   opacity: 0,
  //   y: 40,
  //   duration: 0.9,
  //   stagger: 0.2,
  //   ease: 'power3.out',
  //   delay: 0.2,
  // });

  // gsap.from('.image-card', {
  //   opacity: 0,
  //   scale: 0.9,
  //   duration: 1,
  //   ease: 'power3.out',
  //   delay: 0.1,
  // });