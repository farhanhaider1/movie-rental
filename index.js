const config = require('config');
const express = require('express');
const Joi = require('joi');
const genre = require('./routes/genres.js');
const customers = require('./routes/customers.js');
const movies = require('./routes/movies.js');
const rentals = require('./routes/rentals.js');
const auth = require('./routes/auth');
const users = require('./routes/users');
const app = express();

if(!config.get('jwtKey')){
  console.error('FATAL ERROR: jwt p key not defined');
  process.exit(1);
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true },{ useUnifiedTopology: true } )
    .then(()=> console.log('connecting to mongoDB'))
    .catch((err => console.error('no database')));

app.use(express.json());

app.use('/api/genres',genre);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

app.get('/', (req,res) => {
  res.send('home');
});

app.get('/multipleParams/:id&:p2&:param3',async (req,res)=>{
  //await to be used
  console.log(req.params.id);
  console.log(req.params.p2);
  console.log(req.body.p3);
  res.send('logged');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));  

//!getting the current user next