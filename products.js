
// ==========================================
// Navbar - Mobile Menu
// ==========================================
const menuToggle = document.querySelector(".menu-toggle");
const navItems = document.querySelector(".nav-items");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navItems.classList.toggle("active");

});
// ==========================================
// Product Quantity
// ==========================================

const plusButton = document.querySelector(".quantity-plus");
const minusButton = document.querySelector(".quantity-minus");
const quantityNumber = document.querySelector(".quantity-number");

let quantity = 1;

if (plusButton && minusButton && quantityNumber) {

    // Increase quantity
    plusButton.addEventListener("click", () => {
        quantity++;
        quantityNumber.textContent = quantity;
    });


    // Decrease quantity
    minusButton.addEventListener("click", () => {

        if (quantity > 1) {
            quantity--;
            quantityNumber.textContent = quantity;
        }

    });

}


// ==========================================
// Add Product To Cart
// ==========================================

const addToCartButton = document.querySelector(".add-to-cart");

if (addToCartButton) {

    addToCartButton.addEventListener("click", () => {

        const productName = document
            .querySelector(".product-info h1")
            .textContent
            .trim();

        const productPrice = document
            .querySelector(".product-price")
            .textContent
            .trim();

        const productImage = document
            .querySelector(".product-main-image img")
            .src;


        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        };


        // Get existing cart
        let cart = JSON.parse(localStorage.getItem("cart")) || [];


        // Check if product already exists
        const existingProduct = cart.find(
            item => item.name === product.name
        );


        if (existingProduct) {

            existingProduct.quantity += product.quantity;

        } else {

            cart.push(product);

        }


        // Save cart
        localStorage.setItem("cart", JSON.stringify(cart));


        // Message
        alert("محصول با موفقیت به سبد خرید اضافه شد.");

    });

}