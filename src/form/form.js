import "../assets/sass/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    const json = JSON.stringify(article);
    //fetch
  }
});

const formIsValid = (article) => {
  if (!article.author || !article.category || !article.content) {
    errors.push("You must fill in all the fields...");
  }
  if (article.content.length < 20) {
    errors.push("The content of your article is too short!");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
  } else {
    errorElement.innerHTML = "";
  }
};
