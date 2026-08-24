
let cartCount = localStorage.getItem("cartCount")
    ? parseInt(localStorage.getItem("cartCount"))
    : 0;

const cartDisplay = document.getElementById("cart-count");
cartDisplay.textContent = cartCount;

// Add to Cart
const cartButtons = document.querySelectorAll(".product-card button");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        cartCount++;

        cartDisplay.textContent = cartCount;

        localStorage.setItem("cartCount", cartCount);

        alert("✅ Product added to cart!");

    });

});



const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {

        const productName = card.querySelector("h3").textContent.toLowerCase();

        if(productName.includes(value)){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

});



const shopBtn = document.querySelector(".hero button");

shopBtn.addEventListener("click", () => {

    document.getElementById("products").scrollIntoView({

        behavior:"smooth"

    });

});

// ============================
// Contact Form
// ============================

const form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("✅ Thank you! We will contact you soon.");

    form.reset();

});

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});


const topBtn = document.getElementById("topBtn");

window.onscroll = function(){

    if(document.documentElement.scrollTop > 300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

};

topBtn.onclick = function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};


function subscribe() {

    const email = document.getElementById("email");

    if (email.value.trim() === "") {
        alert("Please enter your email address.");
        return;
    }

    if (!email.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("🎉 Thank you for subscribing!");

    email.value = "";
}