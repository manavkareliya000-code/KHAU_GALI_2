/* ==========================
   SEARCH
========================== */

const searchInput =
document.getElementById(
    "searchInput"
);

if(searchInput){

    searchInput.addEventListener(
        "input",
        function(){

            const value =
            this.value.toLowerCase();

            const filtered =
            products.filter(product =>

                product.name
                .toLowerCase()
                .includes(value)

                ||

                product.gujarati
                .toLowerCase()
                .includes(value)

            );

            renderProducts(
                filtered
            );

        }
    );

}

/* ==========================
   CATEGORY FILTER
========================== */

const filterButtons =
document.querySelectorAll(
    ".filters button"
);

filterButtons.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            filterButtons.forEach(btn=>{

                btn.classList.remove(
                    "active"
                );

            });

            button.classList.add(
                "active"
            );

            const category =
            button.dataset.category;

            if(
                category === "all"
            ){

                renderProducts(
                    products
                );

                return;
            }

            const filtered =
            products.filter(
                product =>

                product.category ===
                category
            );

            renderProducts(
                filtered
            );

        }
    );

});


/* ==========================
   INITIAL LOAD
========================== */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        renderProducts(
            products
        );

    }
);