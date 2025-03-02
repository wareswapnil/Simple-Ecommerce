const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart");
let cart = [];

async function loadProducts() {
    const res = await fetch("http://localhost:8000/products");
    const products = await res.json();

    products.forEach(product => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${product.name}</h3><p>$${product.price}</p><button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>`;
        productList.appendChild(div);
    });
}

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    renderCart();
}

function renderCart() {
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });
}

async function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");

    await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
    });

    alert("Order placed!");
    cart = [];
    renderCart();
}

loadProducts();
    