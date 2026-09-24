
// ==========================================
// Navbar - Mobile Menu
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navItems = document.querySelector(".nav-items");

if (menuToggle && navItems) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navItems.classList.toggle("active");

    });

}
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
// Update Cart Badge
function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-badge");

    if (!cartBadge) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalQuantity = cart.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    if (totalQuantity > 0) {
        cartBadge.textContent = totalQuantity;
        cartBadge.style.display = "flex";
    } else {
        cartBadge.style.display = "none";
    }
}

updateCartBadge();
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


localStorage.setItem("cart", JSON.stringify(cart));

alert("محصول با موفقیت به سبد خرید اضافه شد.");

location.reload();
    });

}


// Cart

const cartItems = document.querySelector(".cart-items");
const emptyCart = document.querySelector(".empty-cart");

if (cartItems && emptyCart) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPriceElement = document.querySelector(".total-price");

if (totalPriceElement) {
    const totalPrice = cart.reduce((total, product) => {

        const price = Number(
            product.price
                .replace("قیمت:", "")
                .replace("تومان", "")
                .replace(/,/g, "")
                .trim()
        );

        return total + (price * product.quantity);

    }, 0);

    totalPriceElement.textContent = totalPrice.toLocaleString("en-US");
}


    if (cart.length === 0) {
        emptyCart.style.display = "block";
    } else {
        emptyCart.style.display = "none";

        cart.forEach((product) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

cartItem.innerHTML = `
    <img src="${product.image}" alt="${product.name}">

    <div class="cart-item-info">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <div class="cart-item-quantity">
    <button class="cart-minus">−</button>
    <span class="cart-quantity">${product.quantity}</span>
    <button class="cart-plus">+</button>
</div>
        <button class="remove-cart-item">حذف</button>
    </div>
`;

            cartItems.appendChild(cartItem);
            const removeButton = cartItem.querySelector(".remove-cart-item");

removeButton.addEventListener("click", () => {
    const updatedCart = cart.filter(item => item.name !== product.name);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    location.reload();
});
const plusButton = cartItem.querySelector(".cart-plus");
const quantityDisplay = cartItem.querySelector(".cart-quantity");

plusButton.addEventListener("click", () => {
    product.quantity++;

    quantityDisplay.textContent = product.quantity;

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
});
const minusButton = cartItem.querySelector(".cart-minus");

minusButton.addEventListener("click", () => {
    if (product.quantity > 1) {
        product.quantity--;

        quantityDisplay.textContent = product.quantity;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
    }
});
        });
    }
}

// Checkout
const checkoutItems = document.querySelector(".checkout-items");
const checkoutTotalPrice = document.querySelector(".checkout-total-price");

if (checkoutItems && checkoutTotalPrice) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>سبد خرید شما خالی است.</p>
        `;

        checkoutTotalPrice.textContent = "۰";

    } else {

        let totalPrice = 0;

        cart.forEach((product) => {

            const price = Number(
                product.price
                    .replace("قیمت:", "")
                    .replace("تومان", "")
                    .replace(/,/g, "")
                    .trim()
            );

            totalPrice += price * product.quantity;

            const checkoutItem = document.createElement("div");

            checkoutItem.classList.add("checkout-item");

            checkoutItem.innerHTML = `
                <div class="checkout-item-info">

                    <h3>${product.name}</h3>

                    <span>
                        تعداد: ${product.quantity}
                    </span>

                </div>

                <strong>
                    ${(price * product.quantity).toLocaleString("en-US")}
                    تومان
                </strong>
            `;

            checkoutItems.appendChild(checkoutItem);
        });

        checkoutTotalPrice.textContent =
            totalPrice.toLocaleString("en-US");
    }
}
const checkoutSection = document.querySelector(".checkout-section");

if (checkoutSection) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("سبد خرید شما خالی است.");

        window.location.href = "/cart.html";

    }

}
// Checkout Form

const checkoutForm = document.querySelector("#checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const fullName = document.querySelector("#full-name");
        const phone = document.querySelector("#phone");
        const province = document.querySelector("#province");
        const city = document.querySelector("#city");
        const postalCode = document.querySelector("#postal-code");
        const address = document.querySelector("#address");


        // نام و نام خانوادگی
        if (fullName.value.trim() === "") {

            alert("لطفاً نام و نام خانوادگی را وارد کنید.");
            fullName.focus();
            return;

        }


        // شماره موبایل
        const phoneValue = phone.value.trim();

        if (!/^09\d{9}$/.test(phoneValue)) {

            alert("شماره موبایل باید ۱۱ رقم باشد و با 09 شروع شود.");
            phone.focus();
            return;

        }


        // استان
        if (province.value === "") {

            alert("لطفاً استان را انتخاب کنید.");
            province.focus();
            return;

        }


        // شهر
        if (city.value.trim() === "") {

            alert("لطفاً شهر را وارد کنید.");
            city.focus();
            return;

        }


        // کد پستی
        const postalCodeValue = postalCode.value.trim();

        if (!/^\d{10}$/.test(postalCodeValue)) {

            alert("کد پستی باید دقیقاً ۱۰ رقم باشد.");
            postalCode.focus();
            return;

        }


        // آدرس
        if (address.value.trim() === "") {

            alert("لطفاً آدرس کامل را وارد کنید.");
            address.focus();
            return;

        }


        // Save order
        const cart = JSON.parse(localStorage.getItem("cart")) || [];


        const order = {

            customer: {

                fullName: fullName.value.trim(),

                phone: phoneValue,

                province: province.value,

                city: city.value.trim(),

                postalCode: postalCodeValue,

                address: address.value.trim(),

                note: document.querySelector("#order-note").value.trim()

            },

            products: cart,

            createdAt: new Date().toISOString()

        };


        localStorage.setItem(
            "order",
            JSON.stringify(order)
        );


        alert("اطلاعات سفارش با موفقیت ثبت شد.");

        window.location.href = "/payment.html";

    });

}
// Input Validation

const phoneInput = document.querySelector("#phone");
const postalCodeInput = document.querySelector("#postal-code");

if (phoneInput) {
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, "");
    });
}

if (postalCodeInput) {
    postalCodeInput.addEventListener("input", () => {
        postalCodeInput.value = postalCodeInput.value.replace(/\D/g, "");
    });
}

// Payment

const paymentItems = document.querySelector(".payment-items");
const paymentTotalPrice = document.querySelector(".payment-total-price");
const shippingCostElement = document.querySelector(".shipping-cost");

if (paymentItems && paymentTotalPrice) {

    const order = JSON.parse(localStorage.getItem("order"));

    if (!order || !order.products || order.products.length === 0) {

        paymentItems.innerHTML = `<p>سفارشی برای پرداخت وجود ندارد.</p>`;
        paymentTotalPrice.textContent = "۰";

    } else {

        let productsTotal = 0;

        order.products.forEach((product) => {

            const price = Number(
                product.price
                    .replace("قیمت:", "")
                    .replace("تومان", "")
                    .replace(/,/g, "")
                    .trim()
            );

            productsTotal += price * product.quantity;

            const paymentItem = document.createElement("div");

            paymentItem.classList.add("payment-item");

            paymentItem.innerHTML = `
                <div class="payment-item-info">
                    <h3>${product.name}</h3>
                    <span>تعداد: ${product.quantity}</span>
                </div>

                <strong>
                    ${(price * product.quantity).toLocaleString("en-US")}
                    تومان
                </strong>
            `;

            paymentItems.appendChild(paymentItem);
        });


        // هزینه بسته بندی
        const packagingCost = 30000;

        // هزینه پیش فرض پست
        const postShippingCost = 200000;


        // نمایش هزینه بسته بندی
        const packagingCostElement =
            document.querySelector(".packaging-cost");

        if (packagingCostElement) {
            packagingCostElement.textContent =
                packagingCost.toLocaleString("en-US") + " تومان";
        }


        // محاسبه مبلغ نهایی
        function updatePaymentTotal() {

            const selectedShipping =
                document.querySelector(
                    'input[name="shipping-method"]:checked'
                );

            let finalPrice = productsTotal + packagingCost;


            if (selectedShipping.value === "post") {

                finalPrice += postShippingCost;

                shippingCostElement.textContent =
                    postShippingCost.toLocaleString("en-US") + " تومان";

            } else {

                // تیپاکس پس کرایه است
                shippingCostElement.textContent = "پس‌کرایه";

            }


            paymentTotalPrice.textContent =
                finalPrice.toLocaleString("en-US");
        }


        // محاسبه اولیه
        updatePaymentTotal();


        // تغییر روش ارسال
        const shippingMethods =
            document.querySelectorAll(
                'input[name="shipping-method"]'
            );

        shippingMethods.forEach((method) => {

            method.addEventListener("change", () => {
                updatePaymentTotal();
            });

        });

    }
    const payButton = document.querySelector(".pay-button");

if (payButton) {

    payButton.addEventListener("click", () => {

        const order = JSON.parse(localStorage.getItem("order"));

        if (!order || !order.products || order.products.length === 0) {
            alert("سفارشی برای پرداخت وجود ندارد.");
            return;
        }


        // روش ارسال انتخاب شده
        const selectedShipping =
            document.querySelector(
                'input[name="shipping-method"]:checked'
            );


        // محاسبه مبلغ محصولات
        let productsTotal = 0;

        order.products.forEach((product) => {

            const price = Number(
                product.price
                    .replace("قیمت:", "")
                    .replace("تومان", "")
                    .replace(/,/g, "")
                    .trim()
            );

            productsTotal += price * product.quantity;

        });


        // هزینه بسته بندی
        const packagingCost = 30000;

        // هزینه پست
        const postShippingCost = 200000;


        // محاسبه هزینه ارسال
        let shippingCost = 0;

        if (selectedShipping.value === "post") {
            shippingCost = postShippingCost;
        }


        // مبلغ نهایی
        const finalPrice =
            productsTotal +
            packagingCost +
            shippingCost;


        // اطلاعات نهایی پرداخت
        const paymentData = {

            shippingMethod: selectedShipping.value,

            shippingCost: shippingCost,

            packagingCost: packagingCost,

            productsTotal: productsTotal,

            finalPrice: finalPrice,

            paymentStatus: "pending",

            createdAt: new Date().toISOString()

        };


        // ذخیره اطلاعات پرداخت
        localStorage.setItem(
            "payment",
            JSON.stringify(paymentData)
        );


        alert("اطلاعات پرداخت با موفقیت ثبت شد.");

    });

}
}
const paymentSection = document.querySelector(".payment-section");

if (paymentSection) {

    const order = JSON.parse(localStorage.getItem("order"));

    if (
        !order ||
        !order.products ||
        order.products.length === 0
    ) {

        alert("سفارشی برای پرداخت وجود ندارد.");

        window.location.href = "/cart.html";

    }

}
// Customer Summary

const customerSummary = document.querySelector(".customer-summary");

if (customerSummary) {

    const order = JSON.parse(localStorage.getItem("order"));

    if (order && order.customer) {

        document.querySelector(".summary-full-name").textContent =
            order.customer.fullName;

        document.querySelector(".summary-phone").textContent =
            order.customer.phone;

        document.querySelector(".summary-province").textContent =
            order.customer.province;

        document.querySelector(".summary-city").textContent =
            order.customer.city;

        document.querySelector(".summary-postal-code").textContent =
            order.customer.postalCode;

        document.querySelector(".summary-address").textContent =
            order.customer.address;

    }
}