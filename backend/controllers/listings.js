const Joi = require('joi');

const listings = require('../models/listings');

//Input validation

const listingSchema = Joi.object({
    name: Joi.string().required().min(3).max(27),
    price: Joi.number().required().min(0),
    description: Joi.string().required().min(1),
    image: Joi.string().required().min(1)
});

const updateSchema = Joi.object({
    id: Joi.number().required().min(1),
    name: Joi.string().required().min(3),
    price: Joi.number().required().min(0),
    description: Joi.string().required().min(1),
    image: Joi.string().required().min(1),
});

//Get all listings

const getAllListings = async (req, res) => {
    try {
        const response = await listings.findAllListings();
        if (response) {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }

}

//Create new listing

const createNewListing = async (req, res) => {
    try {

        const listing = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            owner: "TEMPUSER"
        }

        
        const result = await listings.findByListing(listing);
        if (result.length > 0) {
        res.status(400).send('Listing already exists');
        return;
        }


        const { error } = listingSchema.validate(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const response = await listings.createNewListing(listing);
        if (response.affectedRows === 1) {
            const id = response.insertId;
            const addedListing = await listings.findListingById(id)
            res.status(201).json(addedListing[0]);
            console.log(response);
        } else {
            res.status(500).json({message: "Could not add the listing"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error[0]});
    }
}

const updateListingById = async (req, res) => {
    try {

        const { error } = updateSchema.validate(req.body);

        if (error) {
            res.status(400).json({ message: error.details[0].message});
            return;
        }

        const listing = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }

        const response = await listings.updateListing(listing);
        res.status(200).json({ message: "Listing updated"})
    

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error[0]});
    }
}


module.exports = {
    getAllListings,
    createNewListing,
    updateListingById
  };