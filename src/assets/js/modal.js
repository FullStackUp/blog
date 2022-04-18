const body = document.querySelector("body");
let calc;
let modal;
let cancel;
let confirm;

const createCalc = () => {
  calc = document.createElement("div");
  calc.classList.add("calc");
};

const createMondal = (question) => {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `<p class="text-error">${question}</p>`;

  cancel = document.createElement("button");
  cancel.innerText = "Cancel";
  cancel.classList.add("btn", "btn-secondary");
  confirm = document.createElement("button");
  confirm.classList.add("btn", "btn-primary");
  confirm.innerText = "Confirm";
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  modal.append(cancel, confirm);
};

export function openModal(question) {
  createCalc();
  createMondal(question);
  calc.append(modal);
  body.append(calc);
  return new Promise((resolve, reject) => {
    calc.addEventListener("click", () => {
      resolve(false);
      calc.remove();
    });

    cancel.addEventListener("click", () => {
      resolve(false);
      calc.remove();
    });
    confirm.addEventListener("click", () => {
      resolve(true);
      calc.remove();
    });
  });
}
