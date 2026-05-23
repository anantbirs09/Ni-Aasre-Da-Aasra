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

const revealItems = document.querySelectorAll(".reveal-load");

const revealOnLoad = () => {
  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${index * 180}ms`);
    item.classList.add("is-visible");
  });
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", revealOnLoad, { once: true });
} else {
  revealOnLoad();
}

const counters = document.querySelectorAll("[data-target]");
const impactSection = document.querySelector("#impact");

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

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || impactSection?.dataset.counted) return;

    impactSection.dataset.counted = "true";
    counters.forEach(runCounter);
    counterObserver.disconnect();
  });
}, { threshold: 0.35 });

if (impactSection && counters.length) {
  counterObserver.observe(impactSection);
}

document.querySelectorAll(".video-hero video").forEach((video) => {
  video.muted = true;
  video.play?.().catch(() => {});
});
