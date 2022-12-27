const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const submitBtn = document.querySelector(".btn-submit");
const formPages = document.querySelectorAll(".quote-form>fieldset");
let i = 0;

nextBtn.addEventListener('click', () => {
    const currentFormPage = formPages[i++];
    const nextFormPage = currentFormPage.nextElementSibling;

    currentFormPage.classList.remove("active");
    document.activeElement.blur();
    if (i == 1) prevBtn.toggleAttribute("hide");

    if (i == formPages.length - 1) {
        nextBtn.toggleAttribute("hide");
        submitBtn.toggleAttribute("hide");
    }

    nextFormPage.classList.add("active");
})

prevBtn.addEventListener('click', () => {
    const currentFormPage = formPages[i--];
    const prevFormPage = currentFormPage.previousElementSibling;

    currentFormPage.classList.remove("active");

    if (i == 0) prevBtn.toggleAttribute("hide");

    if (i == formPages.length - 2) {
        submitBtn.toggleAttribute("hide");
        nextBtn.toggleAttribute("hide");
    }

    prevFormPage.classList.add("active");
})


const newHomeRadios = document.querySelectorAll("input[name=\"isnewhome\"");

newHomeRadios.forEach(radioBtn => {
    radioBtn.addEventListener('click', () => {
        const builderElements = document.querySelectorAll(".builder-name");
        const newHomeYes = document.querySelector("#newhome-true");

        builderElements.forEach(elem => {
            newHomeYes.checked ? elem.removeAttribute("hide") : elem.setAttribute("hide", null);
        })
    })
})