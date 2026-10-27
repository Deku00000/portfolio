// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Nav: shrink on scroll + mobile menu
const nav = document.getElementById("nav");
const toggle = nav.querySelector(".nav__toggle");
addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 40), { passive: true });
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});
nav.querySelectorAll(".nav__links a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", false);
    document.body.style.overflow = "";
  })
);

// Fade elements in as they scroll into view
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Work category filters
const filters = document.querySelectorAll(".filter");
const groups = document.querySelectorAll(".work-group");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    groups.forEach((g) => {
      g.classList.toggle("is-hidden", f !== "all" && g.dataset.group !== f);
      g.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    });
  })
);

// Lightbox for work images
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const closeLb = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
};
document.querySelectorAll(".tile, .logo-tile").forEach((fig) =>
  fig.addEventListener("click", () => {
    const img = fig.querySelector("img");
    if (!img || fig.querySelector(".is-empty")) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  })
);
lightbox.addEventListener("click", (e) => { if (e.target !== lbImg) closeLb(); });
addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });
