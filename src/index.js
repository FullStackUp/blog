import { async } from "regenerator-runtime";
import "./assets/sass/styles.scss";
import "./index.scss";

const articlesContainerElement = document.querySelector(".articles-container");

const createArticles = (articles) => {
  const articlesDOM = articles.map((article) => {
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
    <img
        src="${article.img}"
        alt="profile"
    />
    <h2>${article.title}</h2>
    <p class="article-author">${article.author} - ${new Date(
      article.createdAt
    ).toLocaleDateString("en-EN", {
      weekday: "long",
      month: "long",
      day: "2-digit",
      year: "numeric",
    })}</p>
    <p class="article-content">
        ${article.content}
    </p>
    <div class="article-action">
        <button class="btn btn-danger" data-id=${article._id}>Delete</button>
        <button class="btn btn-primary" data-id=${article._id}>Edit</button>
    </div>
    `;
    return articleDOM;
  });
  articlesContainerElement.innerHTML = "";
  articlesContainerElement.append(...articlesDOM);
  const deleteButtons =
    articlesContainerElement.querySelectorAll(".btn-danger");
  const editButtons = articlesContainerElement.querySelectorAll(".btn-primary");
  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`./form.html?id=${articleId}`);
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const response = fetch(`https://restapi.fr/api/articles/${articleId}`, {
          method: "DELETE",
        });
        const body = await (await response).json();
        fetchArticles();
      } catch (e) {
        console.log("e : ", e);
      }
    });
  });
};

const fetchArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/articles");
    const articles = await response.json();
    console.log(articles);
    createArticles(articles);
  } catch (e) {
    console.log("e : ", e);
  }
};

fetchArticles();
