const postContent = document.getElementById("postContent");
const postButton = document.getElementById("postBtn");


// ===============================
// CREATE POST
// ===============================

postButton.addEventListener("click", async function() {

    const content = postContent.value.trim();

    if (content === "") {
        alert("Please write something before posting.");
        return;
    }

    const username = localStorage.getItem("username");

    try {

        const response = await fetch("http://localhost:3000/api/posts", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                content: content
            })

        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            postContent.value = "";

            // Reload posts after creating a post
            loadPosts();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Could not connect to the server.");

    }

});


// ===============================
// LOAD ALL POSTS
// ===============================

async function loadPosts() {

    const postsContainer = document.getElementById("postsContainer");

    try {

        const response = await fetch("http://localhost:3000/api/posts");

        const posts = await response.json();

        postsContainer.innerHTML = "";

        if (posts.length === 0) {

            postsContainer.innerHTML = "<p>No posts yet.</p>";

            return;

        }


        posts.forEach(function(post) {

            const postElement = document.createElement("div");

            postElement.classList.add("post-card");


            // ===============================
            // DISPLAY COMMENTS
            // ===============================

            let commentsHTML = "";

            if (post.comments && post.comments.length > 0) {

                post.comments.forEach(function(comment) {

                    commentsHTML += `
                        <div class="comment">

                            <strong>${comment.username}</strong>

                            <p>${comment.text}</p>

                            <small>
                                ${new Date(comment.createdAt).toLocaleString()}
                            </small>

                        </div>
                    `;

                });

            } else {

                commentsHTML = "<p>No comments yet.</p>";

            }


            // ===============================
            // POST HTML
            // ===============================

            postElement.innerHTML = `

                <h3>${post.username}</h3>

                <p>${post.content}</p>

                <small>
                    ${new Date(post.createdAt).toLocaleString()}
                </small>


                <div class="post-actions">

                    <button
                        class="likeBtn"
                        data-id="${post._id}">
                        ❤️ ${post.likes || 0}
                    </button>

                </div>


                <div class="comment-section">

                    <input
                        type="text"
                        class="commentInput"
                        data-id="${post._id}"
                        placeholder="Write a comment..."
                    >

                    <button
                        class="commentBtn"
                        data-id="${post._id}">
                        Comment
                    </button>

                </div>


                <div class="comments-container">

                    ${commentsHTML}

                </div>

            `;


            postsContainer.appendChild(postElement);

        });


    } catch (error) {

        console.log(error);

        postsContainer.innerHTML =
            "<p>Could not load posts.</p>";

    }

}


// Load posts when page opens
loadPosts();


// ===============================
// LIKE POST
// ===============================

document.addEventListener("click", async function(event) {

    if (event.target.classList.contains("likeBtn")) {

        const postId = event.target.getAttribute("data-id");

        try {

            const response = await fetch(
                `http://localhost:3000/api/posts/${postId}/like`,
                {
                    method: "PUT"
                }
            );

            const data = await response.json();

            if (response.ok) {

                event.target.innerHTML = `❤️ ${data.likes}`;

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);

            alert("Could not like the post.");

        }

    }

});


// ===============================
// ADD COMMENT
// ===============================

document.addEventListener("click", async function(event) {

    if (event.target.classList.contains("commentBtn")) {

        const postId = event.target.getAttribute("data-id");

        const commentInput = document.querySelector(
            `.commentInput[data-id="${postId}"]`
        );

        const text = commentInput.value.trim();


        if (text === "") {

            alert("Please write a comment.");

            return;

        }


        const username = localStorage.getItem("username");


        try {

            const response = await fetch(
                `http://localhost:3000/api/posts/${postId}/comment`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        text: text
                    })

                }
            );


            const data = await response.json();


            if (response.ok) {

                alert(data.message);

                commentInput.value = "";

                // Reload posts so the new comment appears
                loadPosts();

            } else {

                alert(data.message);

            }


        } catch (error) {

            console.log(error);

            alert("Could not add comment.");

        }

    }

});