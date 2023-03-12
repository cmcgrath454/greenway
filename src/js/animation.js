function activateFade(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting)
            entry.target.classList.add("fade-on-scroll-activate");
    })
}

const fadeObserver = new IntersectionObserver(activateFade, { threshold: 0.3 });

document.querySelectorAll(".fade-on-scroll").forEach((element) => {
    fadeObserver.observe(element);
})
