const menuToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.getElementById("main-navigation");
const closeBtn = document.querySelector(".menu-close");
const openBtn = document.querySelector(".menu-open");
const body = document.querySelector("body");

menuToggle.addEventListener('click', () => {
    nav.classList.contains("w-100") ? nav.classList.remove("w-100") : nav.classList.add("w-100");
    body.classList.contains("fixed-position") ? body.classList.remove("fixed-position") : body.classList.add("fixed-position");
    menuToggle.setAttribute("aria-expanded", !(menuToggle.getAttribute("aria-expanded") == "true"));
    for (const child of menuToggle.children) {
        if (child.nodeName == "IMG")
            child.toggleAttribute("hide");
    }
})
