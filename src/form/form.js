import { async } from "regenerator-runtime";
import "../assets/sass/styles.scss";
import "./form.scss";
import "../assets/js/modal.js";
import { openModal } from "../assets/js/modal.js";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const btnCancel = document.querySelector(".btn-secondary");
let articleId;
let errors = [];

// We fill in all the fields of our form by creating references
// and using information retrieved from the server.
const fillForm = (article) => {
  const author = document.querySelector('input[name="author"]');
  const img = document.querySelector('input[name="img"]');
  const category = document.querySelector('input[name="category"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector("textarea");
  author.value = article.author || "";
  img.value = article.img || "";
  category.value = article.category || "";
  title.value = article.title || "";
  content.value = article.content || "";
};

// We are going to create an asynchronous function that we invoke immediately.
// We parse the page URL and check if we have an id parameter.
// If we have an id, we retrieve the corresponding article.
const initForm = async () => {
  const params = new URL(location.href);
  articleId = params.searchParams.get("id");
  if (articleId) {
    const response = await fetch(
      `https://restapi.fr/api/articles/${articleId}`
    );
    if (response.status < 300) {
      const article = await response.json();
      fillForm(article);
    }
  }
};

initForm();

btnCancel.addEventListener("click", async () => {
  const result = await openModal(
    `⚠️ If you cancel, you will lose your content.`
  );
  if (result) {
    location.assign("./index.html");
  }
});

// When we edit, we do not create a new resource on the server.
// So we are not using a POST request but a PATCH request.
// Not PUT because we are not replacing the remote resource (we keep creation date and id).
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      let response;
      if (articleId) {
        response = await fetch(`https://restapi.fr/api/articles/${articleId}`, {
          method: "PATCH",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await fetch("https://restapi.fr/api/articles", {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
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
