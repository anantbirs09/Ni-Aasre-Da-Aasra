const nav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".nav-toggle");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a, .nav-donate").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const counters = document.querySelectorAll("[data-target]");

const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

const runCounter = (counter) => {
  const target = Number(counter.dataset.target || 0);
  const duration = 1300;
  const start = performance.now();

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = formatNumber(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.target.dataset.counted) return;
    entry.target.dataset.counted = "true";
    runCounter(entry.target);
  });
}, { threshold: 0.4 });

counters.forEach((counter) => observer.observe(counter));

document.querySelectorAll(".video-hero video").forEach((video) => {
  video.muted = true;
  video.play?.().catch(() => {});
});
