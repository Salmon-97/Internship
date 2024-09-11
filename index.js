const express = require("express");
const mongoose = require("mongoose");
const { 
  unknownRoute, 
  createUser,
  getBase, 
  fetchAllUsers, 
  updateUser, 
  deleteUser, 
  createBlog,
  fetchAllBlogs,
  updateBlog,
  deleteBlog,
  fetchBlogById,
} = require("./controllers");
const { 
  signupUser, 
  loginUser, 
  isTokenValid 
} = require("./controllers/auth.controllers");
const { 
  validateSignupData, 
  validateLoginData 

} = require("./controllers/validator/auth.validator.js")
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("./passport.js");
const api = express();
const port = 5050;
const dotenv = require("dotenv");
dotenv.config();



// api.use(
//   session({
//     secret: process.env.SESSION_SECRET, // session secret
//     resave: false,
//     saveUninitialized: false,
//   })
// );

api.use( 
  session({ 
    resave: false, 
    saveUninitialized: false, 
    // secret: "7fe30b05275f106407b14ce6a5ac50f4da8abda0560deda17b1cb1bb2f665f3e",
    secret: process.env.SESSION_KEY, 
  }) 
); 


api.use(passport.initialize());
api.use(passport.session());

api.use(express.urlencoded({extended: true}));
api.use(express.json())


api.get("/", getBase);
api.post("/user", createUser, validateLoginData);
api.get("/user", fetchAllUsers);
api.put("/user/:id", updateUser)
api.post("/signup", signupUser, validateSignupData);
api.post("/login", loginUser, validateLoginData)
api.delete("/user/:id", deleteUser);
api.post("/post", isTokenValid, (req, res) => {
      try {
        res.status(200).json({
          message: "you are authorized to to view this page"
      });
      } catch (error) {
        console.log(error)
        return res.status(500).json({
                message: "server error"
            });
      }
    });

    api.post("/blog", createBlog);
    api.put("/blog/:id", updateBlog);
    api.get("/blog", fetchAllBlogs);
    api.delete("/blog/:id", deleteBlog);
    api.get("/blog/:id", fetchBlogById);
    

    // routes 
api.get('/', (req, res) => { 
  res.send('<a href="auth/google">Authenticate with google</a>') 
}); 

api.get( 
  '/auth/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    prompt: 'select_account', 
  }) 
); 

    // api.get(
    //   "/auth/google/callback",
    //   passport.authenticate("google", {
    //     access_type: "offline",
    //     scope: ["email", "profile"],
    //   }),
    //   async (req, res) => {
    //     if (!req.user) {
    //       res.status(400).json({ error: "Authentication failed" });
    //       console.log("er", res);
    //     }
    //     console.log(req.user);
    //     const userExists = await User.findOne({ email: req.user.emails[0].value });
    //     if (userExists) {
    //       const passwordMatch = userExists.checkPassword(
    //         req.user.id.concat("$Google")
    //       );
    //       if (passwordMatch) {
    //         let token = userExists.generateToken();
    //         res.status(201).json({
    //           message: "login successful",
    //           user: userExists,
    //           token,
    //         });
    //       } else {
    //         res.status(400).json({ message: "wrong credentials" });
    //       }
    //     } else {
    //       const googleUser = new User({
    //         fullname: req.user.displayName,
    //         email: req.user.emails[0].value,
    //         password: req.user.id.concat("$Google"),
    //         phone: req.user.id,
    //       });
    //       const token = googleUser.generateToken();
    //       await googleUser.save();
    //       res
    //         .status(201)
    //         .json({ message: "signup successful", user: googleUser, token });
    //     }
    //   }
    // );

    api.get( 
      '/auth/google/redirect', 
      passport.authenticate('google', { 
        failureRedirect: '/' 
      }), 
      // middleware for user add or create 
      function(req, res) { 
        res.send('success') 
      } 
    ); 
    

api.all("*", unknownRoute);

api.listen(port, async () => {
    try {
    console.log("server is running on port ${5050}");
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error)
  }
});