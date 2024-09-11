const User = require("../model/user.model");
const Blog = require("../model/blog.model");


async function getBase(req, res) {
    try {
        res.status(200).json({
            message: "welcome to the other side"
        });
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    };
}

async function createUser(req, res) {
    try {
        let userExists = await User.findOne({email: req.body.email});
        if(userExists) {
            res.status(400).json({
                message: "user already exist, i think you should login"
            });
        } else {
            let user = new User(req.body);
            await user.save();
            res.status(201).json({
                message: "user created", user
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function fetchAllUsers(req, res) {
    try {
        let users = await User.find()
        res.status(200).json({message: "users fetched", users});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function updateUser(req, res) {
    try {
        let userExists = await User.findById(req.params.id);
        if (userExists) {
            await userExists.updateOne(req.body);
            res.status(201).json({
                message: "user updated",
                userExists
            });
        } else {
            res.status(404).json({
                message: "user does not exist",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function deleteUser (req, res) {
    try {
        let userExists = await User.findById(req.params.id);
        if (userExists) {
            await userExists.deleteOne(req.body);
            res.status(201).json({
                message: "user deleted",
                userExists
            });
        } else {
            res.status(404).json({
                message: "user does not exist",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

// async function unknownRoute(req, res) {
//     try {
//         res.status(404).json({
//             message: "page not found"
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "server error"
//         });
//     }
// }



async function createBlog(req, res) {
    try {
            let blog = new Blog(req.body);
            await blog.save();
            res.status(201).json({
                message: "blog created", blog
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function fetchAllBlogs(req, res) {
    try {
        let blogs = await Blog.find()
        res.status(200).json({message: "blogs fetched", blogs});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function fetchBlogById(req, res) {
    try {
        let blog = await Blog.findById(req.params.id)
        res.status(200).json({
            message: "blog fetched by id", blog
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function updateBlog(req, res) {
    try {
        let blogExists = await Blog.findById(req.params.id);
        if (blogExists) {
            await blogExists.updateOne(req.body);
            res.status(201).json({
                message: "blog updated",
                blogExists
            });
        } else {
            res.status(404).json({
                message: "blog does not exist",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function deleteBlog (req, res) {
    try {
        let blogExists = await Blog.findById(req.params.id);
        if (blogExists) {
            await blogExists.deleteOne(req.body);
            res.status(201).json({
                message: "blog deleted",
                blogExists
            });
        } else {
            res.status(404).json({
                message: "blog does not exist",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function unknownRoute(req, res) {
    try {
        res.status(404).json({
            message: "page not found"
        });
    } catch (error) {
        res.status(500).json({
            message: "server error"
        });
    }
}


module.exports = { unknownRoute, createUser, createBlog, getBase, fetchAllUsers, fetchAllBlogs, updateUser, updateBlog, deleteUser, deleteBlog, fetchBlogById };