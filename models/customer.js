const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
});

const Customer = mongoose.model('Customer',customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(10), 
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;

