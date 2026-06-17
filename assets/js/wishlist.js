let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

const wishlistCount =
    document.querySelector(".wishlist-btn span");

const wishlistSidebar =
    document.getElementById("wishlist");

const wishlistBtn =
    document.querySelector(".wishlist-btn");

const closeWishlist =
    document.getElementById("closeWishlist");

const overlay =
    document.querySelector(".wishlist-overlay");

const wishlistItems =
    document.getElementById("wishlistItems");

const subtotal =
    document.getElementById("subtotal");

const grandTotal =
    document.getElementById("grandTotal");

const deliveryFee = 40;

function savewishlist() {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}


function addTowishlist(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;

    const existing =
        wishlist.find(
            item => item.id === id
        );

    if (existing) {

        existing.qty++;

    } else {

        wishlist.push({
            ...product,
            qty: 1
        });

    }

    updatewishlist();
    showToast(

        `${product.name} added to wishlist`
    );
                console.log("Item add Successfully");


}



function removeFromwishlist(id) {

    wishlist =
        wishlist.filter(
            item => item.id !== id
        );

    updatewishlist();

}



function increaseQty(id) {

    const item =
        wishlist.find(
            product => product.id === id
        );

    if (item) {
        console.log("Item is increase Successfully");
        item.qty++;

        updatewishlist();
    }

}



function decreaseQty(id) {

    const item =
        wishlist.find(
            product => product.id === id
        );
        console.log("Item is decrease Successfully");

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {

        removeFromwishlist(id);
        console.log("Item is not found in wishlist");

        return;
    }

    updatewishlist();

}



function updatewishlist() {

    updateCounter();

    renderwishlist();

    calculateTotals();

    savewishlist();

}



function updateCounter() {

    const totalItems =
        wishlist.reduce(
            (total, item) =>
                total + item.qty,
            0
        );

    wishlistCount.textContent =
        totalItems;

}



function renderwishlist() {

    if (!wishlistItems) return;

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `

        <div class="empty-wishlist">

            <i class="bi bi-wishlist-x"></i>

            <h4>
                Your wishlist is empty
            </h4>

            <p>
                Add delicious food
                items to begin.
            </p>

        </div>

        `;

        return;
    }

    wishlistItems.innerHTML = "";

    wishlist.forEach(item => {

        wishlistItems.innerHTML += `

        <div class="wishlist-item">

            <img
             src="${item.image}"
             alt="${item.name}"
            >

            <div class="wishlist-info">

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
            onclick="removeFromwishlist(${item.id})">

                <i class="bi bi-trash"></i>

            </button>

        </div>

        `;

    });

}



function calculateTotals() {

    let total = 0;

    wishlist.forEach(item => {

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


//////////// wishlist open close////////////



wishlistBtn.addEventListener("click", () => {

    wishlistSidebar.classList.add("active");

    overlay.classList.add("active");

});


closeWishlist.addEventListener("click", () => {

    wishlistSidebar.classList.remove("active");

    overlay.classList.remove("active");

});


overlay.addEventListener("click", () => {

    wishlistSidebar.classList.remove("active");

    overlay.classList.remove("active");

});

updatewishlist();