const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true },{ useUnifiedTopology: true } )
    .then(()=> winston.info('connecting database'));
};
