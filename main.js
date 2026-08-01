function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || elements.length === 0) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupActiveNav() {
  const links = [...document.querySelectorAll(".site-nav a")];
  if (links.length === 0) return;

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  links.forEach((link) => {
    const target = (link.getAttribute("href") || "").split("/").pop();
    const isActive =
      (currentPath === "" && target === "index.html") ||
      target === currentPath ||
      (currentPath === "" && target === "");

    if (isActive) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

setupMobileNav();
setupReveal();
setupActiveNav();
