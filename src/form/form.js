import { async } from "regenerator-runtime";
import "../assets/sass/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const btnCancel = document.querySelector(".btn-secondary");
let errors = [];

btnCancel.addEventListener("click", () => {
  location.assign("./index.html");
});

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
      if (response.status < 299) {
        location.assign("./index.html");
      }
    } catch (e) {
      console.error("e : ", e);
    }
  }
});

const formIsValid = (article) => {
  //Prevent repeating the same error, we create an empty array before.
  errors = [];
  if (
    !article.author ||
    !article.img ||
    !article.category ||
    !article.title ||
    !article.content
  ) {
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
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
