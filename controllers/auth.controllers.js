const User = require("../model/user.model");
const JWT = require("jsonwebtoken")


async function signupUser(req, res) {
    try {
        let userExists = await User.findOne({email: req.body.email});
        if(userExists) {
            res.status(400).json({
                message: "user already exist, login"
            });
        } else {
            let user = new User(req.body);
            const token = user.generateToken()
            await user.save();
            res.status(201).json({
                message: "user created", user,
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}


async function loginUser(req, res) {
    try {
        let userExists = await User.findOne({email: req.body.email});
        if(userExists) {
            const passwordMatch = userExists.checkPassword(req.body.password);
            if (passwordMatch) {
                let token = userExists.generateToken();
                res.status(201).json({
                    message: "login successful",
                    userExists,
                    token,
                })
            } else {
                res.status(400).json({ message: "incorect password" })
            }
        } else {
            res.status(404).json({
                message: "user does not exist, please sign up",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

const isTokenValid = (req, res, next) => {
    try {
        const longToken = req.headers.authorization;
        if(longToken) {
            return res.status(400).json({message: "token not present"});
        }; 
        const token = longToken.split("")[1];
        let user = JWT.verify(token, process.env.JWT_SECRET);
        res.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "invalid token"});
    }
};



module.exports = { signupUser, loginUser, isTokenValid };