
//const _ = require('lodash'); //!used to select data from json
const {User} = require('../models/user');

const Joi = require('joi'); 
const bcrypt = require('bcrypt'); //!used for password hashing
const express = require('express');
const router = express();

router.get('/',async(req,res)=>{
    res.send('works');
});

router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //make sure a user with email dosen't exist already
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) res.status(400).send('Invalid email or password');

    //! --> res.send(true); this is wrong here
    //* use web tokens for future api calls 
    //! this will also reduce query as token can have key info
    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema); //!    I often make mistakes here
}

module.exports = router;

