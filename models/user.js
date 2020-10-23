const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40,
        unique: true 
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id,name: user.name},config.get('jwtKey')); //!generate a token
    return token;
};

const User = mongoose.model('User',userSchema);

function validate(User) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(User, schema);
}

module.exports.User = User;
exports.validate = validate;
