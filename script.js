let cart = [];

function addToCart(name, price, quantity) {
  quantity = parseInt(quantity);
  if(quantity <= 0) return alert("Enter valid quantity");
  // check if already in cart
  let existing = cart.find(item => item.name === name);
  if(existing) {
    existing.quantity += quantity;
  } else {
    cart.push({name, price, quantity});
  }
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart-items");
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `${item.name} x ${item.quantity} = ₹${item.price*item.quantity} 
    <button onclick="removeItem(${index})">Remove</button>`;
    cartDiv.appendChild(div);
  });
  document.getElementById("total").innerText = `Total: ₹${total}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function placeOrder() {
  if(cart.length === 0) return alert("Cart is empty!");
  let orderDetails = "Order Details:\n";
  cart.forEach(item => {
    orderDetails += `${item.name} x ${item.quantity} = ₹${item.price*item.quantity}\n`;
  });
  let total = cart.reduce((acc,item)=> acc + item.price*item.quantity,0);
  orderDetails += `Total: ₹${total}`;

  // Send order via EmailJS
  emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{message: orderDetails})
    .then(()=> {
      alert("Order sent successfully!");
      cart = [];
      renderCart();
    })
    .catch(()=> alert("Failed to send order. Check EmailJS setup."));
}
