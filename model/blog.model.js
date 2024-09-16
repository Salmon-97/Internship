const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content:  {
        type: String,
        required: false
    },
    image:  {
        type: String,
        required: false
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
}, 
{timestamps: true}
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;



