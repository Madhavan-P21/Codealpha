const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());


// ===============================
// REGISTER API
// ===============================

app.post("/api/register", async function(req, res) {

    try {

        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({
            message: "User registered successfully!"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Registration failed"
        });

    }

});


// ===============================
// LOGIN API
// ===============================

app.post("/api/login", async function(req, res) {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        res.json({
            message: "Login successful!",
            username: user.username,
            email: user.email
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });

    }

});


// ===============================
// PROFILE API
// ===============================

app.get("/api/profile/:email", async function(req, res) {

    try {

        const email = req.params.email;

        const user = await User.findOne({ email: email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json({
            username: user.username,
            email: user.email
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Could not get profile"
        });

    }

});

// ===============================
// CREATE POST API
// ===============================

app.post("/api/posts", async function(req, res) {

    try {

        const { username, content } = req.body;

        if (!username || !content) {

            return res.status(400).json({
                message: "Username and content are required"
            });

        }

        const newPost = new Post({
            username: username,
            content: content
        });

        await newPost.save();

        res.json({
            message: "Post created successfully!",
            post: newPost
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to create post"
        });

    }

});

// ===============================
// LIKE POST API
// ===============================

app.put("/api/posts/:id/like", async function(req, res) {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        post.likes = post.likes + 1;

        await post.save();

        res.json({
            message: "Post liked!",
            likes: post.likes
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to like post"
        });

    }

});


// ===============================
// ADD COMMENT API
// ===============================

app.put("/api/posts/:id/comment", async function(req, res) {

    try {

        const { username, text } = req.body;

        if (!username || !text) {

            return res.status(400).json({
                message: "Username and comment are required"
            });

        }

        const post = await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        post.comments.push({
            username: username,
            text: text
        });

        await post.save();

        res.json({
            message: "Comment added successfully!",
            comments: post.comments
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to add comment"
        });

    }

});


// ===============================
// GET ALL POSTS API
// ===============================

app.get("/api/posts", async function(req, res) {

    try {

        const posts = await Post.find().sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get posts"
        });

    }

});


// ===============================
// HOME ROUTE
// ===============================

app.get("/", function(req, res) {

    res.send("SocialHub Server is Running!");

});


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect("mongodb://127.0.0.1:27017/socialhub")

    .then(function() {

        console.log("MongoDB connected successfully!");

    })

    .catch(function(error) {

        console.log("MongoDB connection failed:", error);

    });


// ===============================
// START SERVER
// ===============================

app.listen(PORT, function() {

    console.log(`Server running at http://localhost:${PORT}`);

});