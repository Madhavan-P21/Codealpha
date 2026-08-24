const profileUsername = document.getElementById("profileUsername");
const profileEmail = document.getElementById("profileEmail");

const email = localStorage.getItem("userEmail");

if (!email) {

    alert("Please login first.");
    window.location.href = "login.html";

} else {

    fetch(`http://localhost:3000/api/profile/${encodeURIComponent(email)}`)

        .then(function(response) {
            return response.json();
        })

        .then(function(data) {

            if (data.username) {

                profileUsername.textContent = data.username;
                profileEmail.textContent = data.email;

            } else {

                alert(data.message);
            }

        })

        .catch(function(error) {

            console.log(error);
            alert("Could not load profile.");

        });

}