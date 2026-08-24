const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    likes: {
    type: Number,
    default: 0
},



comments: [
    {
        username: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
