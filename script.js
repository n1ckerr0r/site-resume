gsap.registerPlugin(ScrollTrigger);

// Marks that JavaScript is running; useful if we later add no-JS fallbacks.
document.documentElement.classList.add("js-ready");

// Respect users who prefer reduced motion at the OS/browser level.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Splits heading text into words and characters so GSAP can reveal letters one by one.
function splitText(selector) {
  document.querySelectorAll(selector).forEach((element) => {
    const words = element.textContent.trim().split(" ");
    element.innerHTML = words
      .map((word) => {
        const chars = [...word].map((char) => `<span class="char">${char}</span>`).join("");
        return `<span class="word">${chars}</span>`;
      })
      .join(" ");
  });
}

splitText(".split-text");

// Initial hidden states. GSAP animates these elements back into view.
gsap.set(".site-header", { y: -40, opacity: 0 });
gsap.set(".char", { yPercent: 112, rotate: 6 });
gsap.set(".reveal-text, .reveal-block, .reveal-card", { y: 34, opacity: 0 });

// Infinite loading spinner shown while the intro timeline waits to start.
gsap.to(".preloader__ring", {
  rotate: 360,
  duration: 0.9,
  ease: "none",
  repeat: -1,
});

// Main page intro: hides loader, shows nav, reveals hero letters, then content blocks.
gsap
  .timeline({ defaults: { ease: "power4.out" } })
  .to(".preloader", {
    opacity: 0,
    duration: 0.75,
    delay: 0.45,
    pointerEvents: "none",
  })
  .to(".site-header", { y: 0, opacity: 1, duration: 0.8 }, "-=0.25")
  .to(".hero .char", { yPercent: 0, rotate: 0, stagger: 0.018, duration: 0.9 }, "-=0.55")
  .to(".hero .reveal-text", { y: 0, opacity: 1, stagger: 0.09, duration: 0.8 }, "-=0.85")
  .to(".hero .reveal-block", { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 }, "-=0.65")
  .to(".hero .reveal-card", { y: 0, opacity: 1, scale: 1, duration: 1 }, "-=0.7");

if (!prefersReducedMotion) {
  // Counter-rotation keeps orbit labels readable while the orbit itself spins.
  gsap.to(".orbit", {
    rotate: 360,
    duration: 22,
    repeat: -1,
    ease: "none",
  });

  gsap.to(".orbit span", {
    rotate: -360,
    duration: 22,
    repeat: -1,
    ease: "none",
  });

  // Hero card gently floats, creating depth before any user interaction.
  gsap.to(".floating-card", {
    y: -22,
    rotateX: 4,
    rotateY: -5,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Endless horizontal movement for the secondary projects marquee.
  gsap.to(".marquee__track", {
    xPercent: -50,
    duration: 16,
    ease: "none",
    repeat: -1,
  });
}

// Reveals split characters in non-hero sections when their section enters the viewport.
gsap.utils.toArray(".section:not(.hero) .char").forEach((char) => {
  gsap.to(char, {
    yPercent: 0,
    rotate: 0,
    duration: 0.85,
    ease: "power4.out",
    scrollTrigger: {
      trigger: char.closest("section"),
      start: "top 75%",
    },
  });
});

// Reveals text/content blocks on scroll.
gsap.utils.toArray(".section:not(.hero) .reveal-block").forEach((block) => {
  gsap.to(block, {
    y: 0,
    opacity: 1,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: {
      trigger: block,
      start: "top 84%",
    },
  });
});

// Reveals glass cards on scroll.
gsap.utils.toArray(".section:not(.hero) .reveal-card").forEach((card) => {
  gsap.to(card, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 82%",
    },
  });
});

// Magnetic hover: links/buttons move slightly toward the pointer and snap back on leave.
document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(element, {
      x: x * 0.28,
      y: y * 0.28,
      duration: 0.35,
      ease: "power3.out",
    });
  });

  element.addEventListener("pointerleave", () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: "elastic.out(1, 0.35)",
    });
  });
});

// 3D hover tilt for project cards based on pointer position inside each card.
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 14,
      rotateX: y * -14,
      z: 24,
      duration: 0.35,
      ease: "power2.out",
    });
  });

  card.addEventListener("pointerleave", () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.45)",
    });
  });
});
