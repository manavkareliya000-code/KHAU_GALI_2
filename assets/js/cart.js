let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

const cartCount =
    document.querySelector(".cart-btn span");

const cartSidebar =
    document.getElementById("cart");

const cartBtn =
    document.querySelector(".cart-btn");

const closeCart =
    document.getElementById("closeCart");

const overlay =
    document.querySelector(".cart-overlay");

const cartItems =
    document.getElementById("cartItems");

const subtotal =
    document.getElementById("subtotal");

const grandTotal =
    document.getElementById("grandTotal");

const deliveryFee = 40;

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;

    const existing =
        cart.find(
            item => item.id === id
        );

    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            ...product,
            qty: 1
        });

    }

    updateCart();
    showToast(

        `${product.name} added to cart`
    );
                console.log("Item add Successfully");


}



function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    updateCart();

}



function increaseQty(id) {

    const item =
        cart.find(
            product => product.id === id
        );

    if (item) {
        console.log("Item is increase Successfully");
        item.qty++;

        updateCart();
    }

}



function decreaseQty(id) {

    const item =
        cart.find(
            product => product.id === id
        );
        console.log("Item is decrease Successfully");

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {

        removeFromCart(id);
        console.log("Item is not found in cart");

        return;
    }

    updateCart();

}



function updateCart() {

    updateCounter();

    renderCart();

    calculateTotals();

    saveCart();

}



function updateCounter() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.qty,
            0
        );

    cartCount.textContent =
        totalItems;

}



function renderCart() {

    if (!cartItems) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `

        <div class="empty-cart">

            <i class="bi bi-cart-x"></i>

            <h4>
                Your cart is empty
            </h4>

            <p>
                Add delicious food
                items to begin.
            </p>

        </div>

        `;

        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(item => {

        cartItems.innerHTML += `

        <div class="cart-item">

            <img
             src="${item.image}"
             alt="${item.name}"
            >

            <div class="cart-info">

                <h4>
                    ${item.name}
                </h4>

                <span>
                    ₹${item.price}
                </span>

                <div class="qty-controls">

                    <button
                    onclick="decreaseQty(${item.id})">
                    -
                    </button>

                    <span>
                    ${item.qty}
                    </span>

                    <button
                    onclick="increaseQty(${item.id})">
                    +
                    </button>

                </div>

            </div>

            <button
            class="remove-btn"
            onclick="removeFromCart(${item.id})">

                <i class="bi bi-trash"></i>

            </button>

        </div>

        `;

    });

}



function calculateTotals() {

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.qty;

    });

    if (subtotal) {

        subtotal.textContent =
            `₹${total}`;
    }

    if (grandTotal) {

        grandTotal.textContent =
            `₹${total + deliveryFee}`;
    }

    const progressBar =
        document.getElementById(
            "progressBar"
        );

    const target = 299;

    const percent =
        Math.min(
            (total / target) * 100,
            100
        );

    if (progressBar) {

        progressBar.style.width =
            percent + "%";
    }

    const deliveryText =
        document.getElementById(
            "deliveryText"
        );

    const remaining =
        Math.max(
            target - total,
            0
        );

    if (deliveryText) {

        if (remaining === 0) {

            deliveryText.textContent =
                "🎉 Free delivery unlocked!";

        } else {

            deliveryText.textContent =
                `Add ₹${remaining} more for free delivery.`;

        }
    }

}


//////////// cart open close////////////



cartBtn.addEventListener("click", () => {
    console.log("button click");

    cartSidebar.classList.add("active");

    overlay.classList.add("active");

});


closeCart.addEventListener("click", () => {

    cartSidebar.classList.remove("active");

    overlay.classList.remove("active");

});


overlay.addEventListener("click", () => {

    cartSidebar.classList.remove("active");

    overlay.classList.remove("active");

});

updateCart();