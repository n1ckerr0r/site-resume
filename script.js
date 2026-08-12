// Register the plugin that tracks when sections enter the viewport.
gsap.registerPlugin(ScrollTrigger);

// Mark that JavaScript is active so no-JS fallbacks can react if needed.
document.documentElement.classList.add("js-ready");

// Respect the system reduced-motion preference and avoid overwhelming those users.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Split heading text into words and characters so GSAP can animate it letter by letter.
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

// Base hidden states that the page intro animation starts from.
gsap.set(".site-header", { y: -40, opacity: 0 });
gsap.set(".char", { yPercent: 112, rotate: 6 });
gsap.set(".reveal-text, .reveal-block, .reveal-card", { y: 34, opacity: 0 });

// Keep the preloader ring spinning until the main timeline begins.
gsap.to(".preloader__ring", {
  rotate: 360,
  duration: 0.9,
  ease: "none",
  repeat: -1,
});

// Main intro timeline: hide the preloader, reveal the header, and stage the hero section.
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
  // Rotate the outer orbit one way and the labels the other so the text stays readable.
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

  // Let the floating hero card gently "breathe" to add depth before any interaction.
  gsap.to(".floating-card", {
    y: -22,
    rotateX: 4,
    rotateY: -5,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Move the project marquee endlessly so the section does not feel static.
  gsap.to(".marquee__track", {
    xPercent: -50,
    duration: 16,
    ease: "none",
    repeat: -1,
  });
}

// Reveal non-hero headings character by character when their section enters the viewport.
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

// Standard text blocks fade in and rise slightly on scroll.
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

// Reveal glass-effect cards separately to preserve focus on them.
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

// Magnetic hover for links and buttons: the element follows the cursor slightly, then snaps back.
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

// Project card 3D tilt depends on the cursor position inside each specific card.
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
