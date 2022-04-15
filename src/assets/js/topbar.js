//We create the references for our menu and the menu icon :
const iconMobile = document.querySelector(".header-menu-icon");
const headerMenu = document.querySelector(".header-menu");
//This property will let you know if the menu is open :
let isMenuOpen = false;
//This property will let you know if the mobile menu is created:
let mobileMenuDOM;

//To close the menu, simply remove the open class from the menu :
const closeMenu = () => {
  mobileMenuDOM.classList.remove("open");
};

//We create a div and we add the mobile-menu class.
//We prevent the menu from closing on a click inside.
//We then clone the normal menu links into it.
const createMobileMenu = () => {
  mobileMenuDOM = document.createElement("div");
  mobileMenuDOM.classList.add("mobile-menu");
  mobileMenuDOM.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  mobileMenuDOM.append(headerMenu.querySelector("ul").cloneNode(true));
  headerMenu.append(mobileMenuDOM);
};

//If the menu is not created we create it.
//In any case we open it by adding the open class :
const openMenu = () => {
  if (mobileMenuDOM) {
  } else {
    createMobileMenu();
  }
  mobileMenuDOM.classList.add("open");
};

//Allows you to open or close the menu depending on its status :
const toggleMobileMenu = (event) => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
};

//A click on the icon will open or close the menu
//and prevent the event from being propagated to window :
iconMobile.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});

//We recover clicks on window to close the menu.
window.addEventListener("click", () => {
  if (isMenuOpen) {
    toggleMobileMenu();
  }
});

//If the window is enlarged and it exceeds 480px in width
//So we close the menu if it is open :
window.addEventListener("resize", (event) => {
  if (window.innerWidth > 480 && isMenuOpen) {
    toggleMobileMenu();
  }
});
