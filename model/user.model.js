const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");




const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:  {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
}, 
{timestamps: true}
);

userSchema.pre("save", function () {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
});


userSchema.method("checkPassword", function (password) {
    let valid = bcrypt.compareSync(password, this.password);
    return valid
})


userSchema.method("generateToken", function () {
    const token = JWT.sign(
        {_id: this._id, email: this.email}, 
        process.env.JWT_SECRET, 
        {issuer: "http://localhost:5454", expiresIn: "2H"}
        );
        return token;
});

const User = mongoose.model("user", userSchema);

module.exports = User;