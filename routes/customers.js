const {Customer,validate} = require('../models/customer');
const express = require('express');
const router = express();

router.get('/', async (req, res) => {
    res.send(await Customer.find().sort('name')) ;
});

router.post('/',async(req,res) =>{
    const {error} = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    await customer.save();
    res.send(customer);
});

router.put('/:id',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer
                        .findByIdAndUpdate(req.params.id,{name: req.body.name},{
                            new: true
                        });

    if(!customer) return res.status(400).send('Customer not found');

    res.send(customer);
});

router.delete('/:id',async(req,res)=>{
    res.send(await Customer.findByIdAndRemove(req.params.id).catch(function(){
        return res.status(404).send('Customer was not found');
    }));
});

router.get('/:id',async(req,res)=>{
    res.send(await Customer.findById(req.params.id)
            .catch(res.status(404).send('Customer not found')));
});

module.exports = router;