const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash'); //!used to select data from json
const {User,validate} = require('../models/user');
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
    if(user) return res.status(400).send('email address already registered');

    try {
        //!below was used before
        // user = new User({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password  
        // });
        //!this is used with lodash
        user = new User(_.pick(req.body,['name','email','password'])); //? much better

        //* using bcrypt to hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        
        await user.save(); 
    } catch (ex) {
        res.send('try again');
    }

    const token = user.generateAuthToken(); //!generate a token
    res.header('x-auth-token',token).send(_.pick(user,['name','email']));  //* using lodash to send selective data only
});

module.exports = router;

