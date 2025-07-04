// Sample product data
const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1512499617640-c2f9993be74e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1512303452021-c880132b79e0?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Portable Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Gaming Mouse",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
];

// DOM elements
const productGrid = document.getElementById("productGrid");
const cartSidebar = document.getElementById("cartSidebar");
const cartToggleBtn = document.getElementById("cartToggleBtn");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

let cart = {};
let isSignedIn = false;

// Render products
function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image" />
      <div class="product-info">
        <h4 class="product-title">${product.title}</h4>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
      <button data-id="${product.id}">Add to Cart</button>
    `;

    // Add event listener to button
    card.querySelector("button").addEventListener("click", () => addToCart(product.id));

    productGrid.appendChild(card);
  });
}

// Add to cart
function addToCart(id) {
  if (!cart[id]) {
    cart[id] = { ...products.find((p) => p.id === id), quantity: 1 };
  } else {
    cart[id].quantity++;
  }
  updateCartUI();
}

// Remove from cart
function removeFromCart(id) {
  if (cart[id]) {
    delete cart[id];
    updateCartUI();
  }
}

// Update cart UI
function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  for (const id in cart) {
    const item = cart[id];
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.title} x${item.quantity}
      <button aria-label="Remove ${item.title}" class="btn btn-secondary btn-remove" data-id="${id}">×</button>
    `;
    li.querySelector("button").addEventListener("click", () => removeFromCart(id));
    cartItemsContainer.appendChild(li);
  }

  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = itemCount;
}

// Toggle cart sidebar
cartToggleBtn.addEventListener("click", () => {
  cartSidebar.classList.toggle("hidden");
});

// Sign in/out button logic
signInBtn.addEventListener("click", () => {
  isSignedIn = true;
  signInBtn.classList.add("");
  signOutBtn.classList.remove("");
  alert("Signed in!");
});

signOutBtn.addEventListener("click", () => {
  isSignedIn = false;
  signOutBtn.classList.add("hidden");
  signInBtn.classList.remove("hidden");
  alert("Signed out!");
});

// Initialize
renderProducts();
updateCartUI();
