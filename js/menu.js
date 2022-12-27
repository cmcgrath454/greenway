const menuToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.getElementById("main-navigation");
const closeBtn = document.querySelector(".menu-close");
const openBtn = document.querySelector(".menu-open");

menuToggle.addEventListener('click', () => {
    nav.classList.contains("w-100") ? nav.classList.remove("w-100") : nav.classList.add("w-100");
    menuToggle.setAttribute("aria-expanded", !(menuToggle.getAttribute("aria-expanded") == "true"));
    for (const child of menuToggle.children) {
        if (child.nodeName == "IMG")
            child.toggleAttribute("hide");
    }
    // TODO: Add click outside to close
})
