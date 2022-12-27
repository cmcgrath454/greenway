function activateFade(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting)
            entry.target.classList.add("fade-on-scroll-activate");
    })
}

function activateSlideIn(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting)
            entry.target.classList.add("slide-on-scroll-activate");
    })
}

function activateButtonBorder(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting)
            entry.target.classList.add("button-border-activate");
    })
}


const fadeObserver = new IntersectionObserver(activateFade, { threshold: 0.3 });

document.querySelectorAll(".fade-on-scroll").forEach((element) => {
    fadeObserver.observe(element);
})


const slideObserver = new IntersectionObserver(activateSlideIn, { threshold: 0.3, rootMargin: "0px 100% 0px 100%" });

document.querySelectorAll(".slide-on-scroll-left, .slide-on-scroll-right").forEach((element) => {
    slideObserver.observe(element);
})

const animatedButtonObserver = new IntersectionObserver(activateButtonBorder, { threshold: 0.9 });

document.querySelectorAll(".animated-button-border").forEach((element) => {
    animatedButtonObserver.observe(element);
})

// TODO: Add unobserver for memory leak