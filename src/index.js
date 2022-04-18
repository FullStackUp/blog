import "./assets/sass/styles.scss";
import "./index.scss";
import { openModal } from "./assets/js/modal.js";

const articlesContainerElement = document.querySelector(".articles-container");
const categoriesContainerElment = document.querySelector(".categories");
const selectElement = document.querySelector("select");
let filter;
let articles;
let sortBy = "desc";

selectElement.addEventListener("change", () => {
  sortBy = selectElement.value;
  fetchArticles();
});

const createArticles = () => {
  const articlesDOM = articles
    .filter((article) => {
      if (filter) {
        return article.category === filter;
      } else {
        return true;
      }
    })
    .map((article) => {
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
      const result = await openModal(
        "Are you sure you want to delete your article ?"
      );
      console.log(result);
      if (result === true) {
        try {
          const target = event.target;
          const articleId = target.dataset.id;
          const response = await fetch(
            `https://restapi.fr/api/articles/${articleId}`,
            {
              method: "DELETE",
            }
          );
          const body = await response.json();
          fetchArticles();
        } catch (e) {
          console.log("e : ", e);
        }
      }
    });
  });
};

const displayMenuCategories = (categoriesArr) => {
  const liElements = categoriesArr.map((categoryElem) => {
    const li = document.createElement("li");
    li.innerHTML = `${categoryElem[0]} (<strong>${categoryElem[1]}</strong>)`;
    if (categoryElem[0] === filter) {
      li.classList.add("active");
    }
    li.addEventListener("click", () => {
      if (filter === categoryElem[0]) {
        filter = null;
        li.classList.remove("active");
        createArticles();
      } else {
        filter = categoryElem[0];
        liElements.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
        createArticles();
      }
    });
    return li;
  });

  categoriesContainerElment.innerHTML = "";
  categoriesContainerElment.append(...liElements);
};

const createMenuCategories = () => {
  const categories = articles.reduce((acc, article) => {
    if (acc[article.category]) {
      acc[article.category]++;
    } else {
      acc[article.category] = 1;
    }
    return acc;
  }, {});
  const categoriesArr = Object.keys(categories)
    .map((category) => {
      return [category, categories[category]];
    })
    .sort((c1, c2) => c1[0].localeCompare(c2[0]));
  displayMenuCategories(categoriesArr);
};

const fetchArticles = async () => {
  try {
    const response = await fetch(
      `https://restapi.fr/api/articles?sort=createdAt:${sortBy}`
    );
    articles = await response.json();
    createArticles();
    createMenuCategories();
  } catch (e) {
    console.log("e : ", e);
  }
};

fetchArticles();
