const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb+srv://farhantest:1234@testcluster.maheo.mongodb.net/primary?retryWrites=true&w=majority',{ useNewUrlParser: true },{ useUnifiedTopology: true } )
    .then(()=> winston.info('connecting database'));
};
