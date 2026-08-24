let price = 120;
let quantity = 1;

function updateCart(){

document.getElementById("qty").innerText = quantity;

document.getElementById("total").innerText =
"₹" + (price * quantity);

document.getElementById("grandTotal").innerText =
"₹" + (price * quantity);

}

function increase(){

quantity++;

updateCart();

}

function decrease(){

if(quantity > 1){

quantity--;

updateCart();

}

}

function removeItem(){

document.getElementById("cart-body").innerHTML =
"<tr><td colspan='5'>Your cart is empty.</td></tr>";

document.getElementById("grandTotal").innerText =
"₹0";

}