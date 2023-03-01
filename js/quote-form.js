const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const submitBtn = document.querySelector(".btn-submit");
const formPages = document.querySelectorAll(".quote-form>fieldset");
let i = 0;

nextBtn.addEventListener("click", () => {
  const currentFormPage = formPages[i];
  const nextFormPage = currentFormPage.nextElementSibling;

  if (!validatePage(i)) {
    alert("Please fill in the missing field(s) highlighted in red.");
  } else {
    i++;
    currentFormPage.classList.remove("active");
    document.activeElement.blur();

    if (i == 1) prevBtn.toggleAttribute("hide");

    if (i == formPages.length - 1) {
      nextBtn.toggleAttribute("hide");
      submitBtn.toggleAttribute("hide");
    }

    nextFormPage.classList.add("active");
  }
});

prevBtn.addEventListener("click", () => {
  const currentFormPage = formPages[i--];
  const prevFormPage = currentFormPage.previousElementSibling;

  currentFormPage.classList.remove("active");

  if (i == 0) prevBtn.toggleAttribute("hide");

  if (i == formPages.length - 2) {
    submitBtn.toggleAttribute("hide");
    nextBtn.toggleAttribute("hide");
  }

  prevFormPage.classList.add("active");
});

const newHomeRadios = document.querySelectorAll("input[name='isnewhome'");

newHomeRadios.forEach((radioBtn) => {
  radioBtn.addEventListener("click", () => {
    const builderElements = document.querySelectorAll(".builder-name");
    const newHomeYes = document.querySelector("#newhome-true");

    builderElements.forEach((elem) => {
      newHomeYes.checked ? elem.removeAttribute("hide") : elem.setAttribute("hide", null);
    });
  });
});

function validatePage(pageNo) {
  valid = true;
  switch (pageNo) {
    case 0:
      const name = document.getElementById("name");
      if (name.value.length < 1) {
        showError(name);
        valid = false;
      }
      const email = document.getElementById("email");
      if (!email.value.includes("@") || !email.value.includes(".")) {
        showError(email);
        valid = false;
      }
      const phone = document.getElementById("phone");
      if (phone.value.length < 7) {
        showError(phone);
        valid = false;
      }
      break;
    case 1:
      addressTextLines = [
        document.getElementById("address"),
        document.getElementById("city"),
        document.getElementById("state"),
      ];
      addressTextLines.forEach((element) => {
        if (element.value.length < 1) {
          showError(element);
          valid = false;
        }
      });
      const zip = document.getElementById("zip");
      if (zip.value.length < 5) {
        showError(zip);
        valid = false;
      }
      const newHomeRadios = document.getElementsByName("isnewhome");
      if (!(newHomeRadios[0].checked || newHomeRadios[1].checked)) {
        showError(newHomeRadios[0]);
        valid = false;
      }
      break;
    case 2:
      const desc = document.getElementById("description");
      if (desc.value.length < 1) {
        showError(desc);
        valid = false;
      }
      break;
    case 3:
      const budget = document.getElementById("budget");
      if (budget.selectedIndex == 0) {
        showError(budget);
        valid = false;
      }
      const date = document.getElementById("date");
      if (date.value.length < 1) {
        showError(date);
        valid = false;
      }
    default:
      console.error("contact form page number out of bounds");
      break;
  }
  return valid;
}

function showError(element) {
  element.classList.add("form-error");
  let label = document.querySelector(`label[for="${element.name}"].form-error`);
  label.removeAttribute("hidden", "");
}

function validateTextChange(e) {
  let errorLabel = e.nextElementSibling;
  if (e.value.length < 1) {
    e.classList.add("form-error");
    errorLabel.removeAttribute("hidden");
  } else {
    e.classList.remove("form-error");
    errorLabel.setAttribute("hidden", "");
  }
}

function validateOptionChange(e) {
  let label = document.querySelector(`label[for="${e.name}"].form-error`);
  e.classList.remove("form-error");
  label.setAttribute("hidden", "");
}

function submitForm(btn) {
  btn.disabled = true;
  prevBtn.disable = true;
  if (validatePage(3)) {
    prevBtn.classList.add("hide-btn-on-submit");
    prevBtn.innerText = "";
    btn.innerText = "Sending...";
    grecaptcha.ready(function () {
      grecaptcha.execute("6LfuSRskAAAAAINeGJ_yySvKM40NgKpwRVjwX90o").then(function (token) {
        document.getElementById("token-response").value = token;
        document.getElementById("quote-form").submit();
      });
    });
  } else {
    prevBtn.disabled = false;
    btn.disabled = false;
  }
}
