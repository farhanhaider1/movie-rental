const mongoose = require('mongoose');
const Joi = require('joi');

//const { strict, string } = require('joi');
const genreSchema = new mongoose.Schema({
    name: {
        _id: String,
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    }
});
const Genre = mongoose.model('Genre',genreSchema);

function validate(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}
exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
exports.validate = validate;
 