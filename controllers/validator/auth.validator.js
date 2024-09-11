const joi = require("joi");


const signupSchema = joi.object({
    firstname: joi.string().alphanum().min(3).max(30).required(),
    lastname:  joi.string().alphanum().min(3).max(30).required(),
    age: joi.string().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    email: joi.string().email({
        minDomainSegments: 2, 
        tlds: {allow: ['com', 'net'] } 
    }),  
});

const loginSchema = joi.object({
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    email: joi.string().email({
        minDomainSegments: 2, 
        tlds: {allow: ['com', 'net'] } 
    }),  
});

const validateSignupData = (req, res, next) => {
    try {
        let {error, value} = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message });
        }
        next();
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "server error"})
    } 
};

const validateLoginData = (req, res, next) => {
    try {
        let {error, value} = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message });
        }
        next();
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "server error"});
    } 
};


module.exports = { validateSignupData, validateLoginData };
