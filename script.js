// 1️⃣ Initialize EmailJS (latest SDK)
emailjs.init("NHtKUf_XQBBT-W7PY"); // Your EmailJS User ID

// 2️⃣ Initialize cart
let cart = [];

// 3️⃣ Add item to cart
function addToCart(name, price, quantity) {
    quantity = parseInt(quantity);
    if (quantity <= 0) return alert("Enter valid quantity");

    let existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    renderCart();
}

// 4️⃣ Render cart items and total
function renderCart() {
    const cartDiv = document.getElementById("cart-items");
    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            ${item.name} x ${item.quantity} = ₹${item.price * item.quantity} 
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartDiv.appendChild(div);
    });

    document.getElementById("total").innerText = `Total: ₹${total}`;
}

// 5️⃣ Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// 6️⃣ Place Order using EmailJS
function placeOrder() {
    if (!navigator.onLine) return alert("No internet connection. Please connect and try again.");
    if (cart.length === 0) return alert("Cart is empty!");

    // Build order details
    let orderDetails = "";
    cart.forEach(item => {
        orderDetails += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    orderDetails += `Total: ₹${total}`;

    // Send EmailJS
    emailjs.send("service_glpy52q", "template_2gxdsn8", {
        user_name: "Deeptanshu",
        time: new Date().toLocaleString(),
        order_type: "Pre-orders only",
        message: orderDetails
    })
    .then(response => {
        alert("Order sent successfully!");
        cart = [];
        renderCart();
    })
    .catch(err => {
        alert("EmailJS Failed: " + JSON.stringify(err));
    });
}
