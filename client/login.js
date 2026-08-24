const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginBtn");

loginButton.addEventListener("click", async function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === "" || password === "") {

        alert("Please enter your email and password.");

        return;
    }

    try {

        const response = await fetch("http://localhost:3000/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            // Save login status
            localStorage.setItem("isLoggedIn", "true");

            // Save user's email
            localStorage.setItem("userEmail", data.email);

            // Save user's username
            localStorage.setItem("username", data.username);

            // Go to home page
            window.location.href = "index.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Could not connect to the server.");

    }

});