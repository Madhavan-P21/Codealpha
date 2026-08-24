//const heading = document.getElementById("welcomeText");

//heading.textContent = "Welcome to SocialHub!";

const heading = document.getElementById("welcomeText");
const button = document.getElementById("getStartedBtn");

button.addEventListener("click", function() {
    heading.textContent = "Let's connect and share!";
});


const logoutButton = document.getElementById("logoutBtn");

if (logoutButton) {

    logoutButton.addEventListener("click", function() {

        localStorage.removeItem("isLoggedIn");

        alert("Logged out successfully!");

        window.location.href = "login.html";

    });

}