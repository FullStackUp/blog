const body = document.querySelector("body");
let calc;
let modal;

const createCalc = () => {
  calc = document.createElement("div");
  calc.classList.add("calc");
  calc.addEventListener("click", () => {
    calc.remove();
  });
};

const createMondal = (question) => {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `<p>${question}</p>`;

  const cancel = document.createElement("button");
  cancel.innerText = "Cancel";
  cancel.classList.add("btn", "btn-secondary");
  const confirm = document.createElement("button");
  confirm.classList.add("btn", "btn-primary");
  confirm.innerText = "Confirm";
  modal.append(cancel, confirm);
};

export function openModal(question) {
  createCalc();
  createMondal(question);
  calc.append(modal);
  body.append(calc);
}
