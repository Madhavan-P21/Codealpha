const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerButton = document.getElementById("registerBtn");

registerButton.addEventListener("click", async function(event) {

    event.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (username === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/api/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })

        });

        const data = await response.json();

        alert(data.message);

    } catch (error) {

        console.log(error);
        alert("Could not connect to the server.");

    }

});