import { async } from "regenerator-runtime";
import "../assets/sass/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      const response = await fetch("https://restapi.fr/api/articles", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.error("e : ", e);
    }
  }
});

const formIsValid = (article) => {
  if (!article.author || !article.category || !article.content) {
    errors.push("You must fill in all the fields...");
  }
  if (article.content.length < 20) {
    errors.push("The content of your article is too short!");
  }
  if (article.content.length > 300) {
    errors.push("The content of your article is too long!");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
