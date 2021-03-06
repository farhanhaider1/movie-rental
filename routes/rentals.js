const Fawn = require('fawn');
const express = require('express');
const router = express();
//const mongoose = require('../models/rental');
const {Rental,validate,mongoose} = require('../models/rental'); 
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');


mongoose.connect('mongodb://localhost/vidly');
Fawn.init(mongoose);

router.get('/',async(req,res) => {
    const rentals = Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer Id');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie');

    if(movie.numberInStock === 0) return res.send(400).send('Movie not available');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    // rental = await rental.save();

    // movie.numberInStock--;
    // movie.save();
    try {
        new Fawn.Task()
        .save('rentals',rental)
        .update('movies',{_id: movie._id},{
            $inc: {numberInStock: -1}
        })
        .run();

        res.send(rental);
    } catch (ex) {
        res.status(500).send('something failed');
    }
    
    //res.send(rental);
});

module.exports = router;