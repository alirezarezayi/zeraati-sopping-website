const menuToggle = document.querySelector(".menu-toggle");
const navItems = document.querySelector(".nav-items");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navItems.classList.toggle("active");

});