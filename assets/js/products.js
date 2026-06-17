const products = [
  {
    id: 1,
    name: "Dabeli",
    gujarati: "દાબેલી",
    price: 50,
    category: "snacks",
    spicy: true,
    image: "assets/images/foods/dabeli.jpg",
    description:
      "Kutchi-style potato masala,roasted peanuts, pomegranate, sev, and chutney."
  },

  {
    id: 2,
    name: "Vada Pav",
    gujarati: "વડા પાવ",
    price: 45,
    category: "snacks",
    spicy: true,
    image: "assets/images/foods/vadapav.jpg",
    description:
      "Golden batata vada tucked inside soft pav with garlic chutney."
  },

  {
    id: 3,
    name: "Samosa",
    gujarati: "સમોસા",
    price: 35,
    category: "snacks",
    spicy: false,
    image: "assets/images/foods/samosa.jpg",
    description:
      "Flaky pastry packed with spiced potatoes and and house tamarind chutney."
  },

  {
    id: 4,
    name: "Pani Puri",
    gujarati: "પાણી પુરી",
    price: 60,
    category: "chaat",
    spicy: true,
    image: "assets/images/foods/panipuri.jpg",
    description:
      "Crispy puris filled with vey spicy water, spicy water and tangy chutneys."
  },

  {
    id: 5,
    name: "Sev Puri",
    gujarati: "સેવ પુરી",
    price: 70,
    category: "chaat",
    spicy: true,
    image: "assets/images/foods/sevpuri.jpg",
    description:
      "Crunchy puris topped with potato, chutneys and sev."
  },

  {
    id: 6,
    name: "Kathi Roll",
    gujarati: "કાઠી રોલ",
    price: 110,
    category: "rolls",
    spicy: false,
    image: "assets/images/foods/kathiroll.jpg",
    description:
      "Soft paratha wrapped around spicy filling and sauces."
  },

  {
    id: 7,
    name: "Sandwich",
    gujarati: "સેન્ડવીચ",
    price: 80,
    category: "snacks",
    spicy: false,
    image: "assets/images/foods/Sandwich.jpg",
    description:
      "spicy Bombay Masala Toast or Paneer Tikka Sandwiches."
  },

  {
    id: 8,
    name: "Pakoda",
    gujarati: "પકોડા",
    price: 60,
    category: "snacks",
    spicy: false,
    image: "assets/images/foods/pakoda.jpg",
    description:
      "Moong Dal Pakoda(Mangode) is a popular, crispy Indian fritter."
  },
];

const productsContainer =
  document.getElementById("productsContainer");

function renderProducts(data = products) {

  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  data.forEach(product => {

    const isInWishlist =
      wishlist.some(
        item => item.id === product.id
      );


    productsContainer.innerHTML += `
    
    <div class="food-card">

      <div class="food-image">

        <img src="${product.image}" alt="${product.name}">

      </div>

      <div class="food-content">

        <div class="food-header">

          <div>

            <h3>${product.name}</h3>

            <span class="gujarati">
              ${product.gujarati}
            </span>

          </div>

          <h4>₹${product.price}</h4>

        </div>

        <p>
          ${product.description}
        </p>

        <div class="badges">

          <span class="veg-badge">
            Veg
          </span>

          ${product.spicy
        ? `<span class="spicy-badge">Spicy</span>`
        : `<span class="mild-badge">Mild</span>`
      }
        <button
          class="add-to-wishlist ${isInWishlist ? 'active' : ''}"
          onclick="addTowishlist(${product.id},this)"
        >
          <i class="bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}"></i>
        </button>

        </div>

        <button
          class="add-cart-btn"
          onclick="addToCart(${product.id})"
        >
          Add To Cart
        </button>

      </div>

    </div>

    `;

  });

}

renderProducts();


