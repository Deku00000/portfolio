// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Nav: shrink on scroll + mobile menu
const nav = document.getElementById("nav");
const toggle = nav.querySelector(".nav__toggle");
const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const closeMenu = () => {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", false);
  document.body.style.overflow = "";
};
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});
nav.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", closeMenu));

// Works dropdown: opens on hover (CSS), and on click/tap or keyboard
const group = nav.querySelector(".nav__group");
const worksBtn = nav.querySelector(".nav__works");
worksBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = group.classList.toggle("is-open");
  worksBtn.setAttribute("aria-expanded", open);
});
document.addEventListener("click", (e) => {
  if (!group.contains(e.target)) {
    group.classList.remove("is-open");
    worksBtn.setAttribute("aria-expanded", false);
  }
});

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
addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLb();
    group.classList.remove("is-open");
    closeMenu();
  }
});

// About page: show only the first statement until "See more" is clicked.
// Without JavaScript the full text simply stays visible.
const aboutMore = document.getElementById("about-more");
const aboutToggle = document.querySelector(".about-toggle");
if (aboutMore && aboutToggle) {
  aboutMore.hidden = true;
  aboutToggle.hidden = false;
  aboutToggle.addEventListener("click", () => {
    const open = aboutMore.hidden;
    aboutMore.hidden = !open;
    aboutToggle.setAttribute("aria-expanded", open);
    aboutToggle.firstChild.textContent = open ? "See less " : "See more ";
  });
}

// Awards page: Solo / Duo plaque tabs. Without JavaScript both sets stay visible.
const tabs = document.querySelectorAll(".plaques__tab");
if (tabs.length) {
  const show = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => show(t));
    t.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      show(next);
      next.focus();
    });
  });
  show(tabs[0]);
}
