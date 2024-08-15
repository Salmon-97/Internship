const express = require("express");
const mongoose = require("mongoose");
const { unknownRoute, getBase, createUser, fetchAllUsers, updateUser, deleteUser, } = require("./controllers");
const { signupUser, loginUser } = require("./controllers/auth.controllers")
const api = express();
const port = 5454;


api.use(express.urlencoded({extended: true}));
api.use(express.json())


api.get("/", getBase);
api.post("/user", createUser);
api.get("/User", fetchAllUsers,);
api.put("/user/:id", updateUser)
api.post("./signup", signupUser);
api.post("./login", loginUser)
api.delete("/user/:id", deleteUser);
api.all("*", unknownRoute);

api.listen(port, async () => {
    try {
    console.log("server is running on port ${5454}");
    // await mongoose.connect(process.env.DB_URL);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error)
  }
});