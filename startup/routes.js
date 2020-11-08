const express = require('express');
const genre = require('../routes/genres.js');
const customers = require('../routes/customers.js');
const movies = require('../routes/movies.js');
const rentals = require('../routes/rentals.js');
const auth = require('../routes/auth');
const users = require('../routes/users');
const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres',genre);
    app.use('/api/customers',customers);
    app.use('/api/movies',movies);
    app.use('/api/rentals',rentals);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    app.use(error); //* must always be last
};