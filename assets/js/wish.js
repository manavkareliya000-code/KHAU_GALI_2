let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

const wishlistCount =
    document.querySelector(".wishlist-btn span");

const wishbtn =
    document.querySelector(".add-to-wishlist");

const wishlistSidebar =
    document.getElementById("wishlist");

const wishlistBtn =
    document.querySelector(".wishlist-btn");

const closeWishlist =
    document.getElementById("closeWishlist");

const wishoverlay =
    document.querySelector(".wishlist-overlay");

const wishlistItems =
    document.getElementById("wishlistItems");

function savewishlist() {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    // console.log(wishlist);   

    console.log("---------------------");

    // console.log(JSON.stringify(wishlist[0]));

}


function addTowishlist(id, wishbtn) {

    console.log("add to wishlist");
    const icon =
        wishbtn.querySelector("i")
    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;

    const existing =
        wishlist.find(
            item => item.id === id
        );

    // console.log(existing);

    console.log("----------------");

    if (existing) {
        // console.log("existing");
        // console.log(existing.id);
        removeFromwishlist(existing.id);

        icon.classList.replace(
            "bi-heart-fill",
            "bi-heart"
        );

        wishbtn.classList.remove("active");

        showToast(

            `${existing.name} remove from wishlist`
        );
        console.log("Item removed Successfully");
    }
    else {


        wishlist.push({
            ...product,
            qty: 1
        });

        icon.classList.replace(
            "bi-heart",
            "bi-heart-fill"
        );

        wishbtn.classList.add("active");

        showToast(

            `${product.name} added to wishlist`
        );
        console.log("Item add Successfully");

    }

    updatewishlist();

}



function removeFromwishlist(id) {

    // wishlist.pop(id);
    wishlist = wishlist.filter(
        item => item.id !== id
    );


    updatewishlist();

    renderProducts();
}



function increasewishlistQty(id) {

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



function wishlistdecreaseQty(id) {

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


function removeallfromwishlist(){
    console.log("remove");

    wishlist = [];
    
    updatewishlist();
    
    renderProducts();
}



function updatewishlist() {

    // console.log("update wishlist");

    updatewishlistCounter();

    renderwishlist();

    savewishlist();

}



function updatewishlistCounter() {

    const totalItems =
        wishlist.reduce(
            (total, item) =>
                total + item.qty,
            0
        );
    if (wishlistCount) {
        wishlistCount.textContent =
            totalItems
    }

}



function renderwishlist() {
    // console.log("render wishlist");

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

    else {
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

        wishlistItems.innerHTML += `

        <div class="removeAll">
         <button 
            class="clear-All"
            onclick="removeallfromwishlist()"> Remove All
        </button> 
        </div>
         `;
    }

}




//////////// wishlist open close////////////



wishlistBtn.addEventListener("click", () => {
    console.log("button click");

    wishlistBtn.classList.add("active");

    wishlistSidebar.classList.add("active");

    wishoverlay.classList.add("active");

});


closeWishlist.addEventListener("click", () => {
    console.log("close button");

    wishlistBtn.classList.remove("active");

    wishlistSidebar.classList.remove("active");

    wishoverlay.classList.remove("active");

});


wishoverlay.addEventListener("click", () => {
    console.log("overlay remove");

    wishlistBtn.classList.remove("active");

    wishlistSidebar.classList.remove("active");

    wishoverlay.classList.remove("active");

});



updatewishlist();