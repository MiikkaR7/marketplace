const Joi = require('joi');

const listings = require('../models/listings');
const users = require('../models/users');

//Input validation

const listingSchema = Joi.object({
    name: Joi.string().required().min(2).max(30),
    price: Joi.number().required().min(0.01),
    description: Joi.string().required().min(1),
    image: Joi.string().required().min(1),
    owner: Joi.string().required().min(36),
    displayname: Joi.string().required().min(2).max(27)
});

const updateSchema = Joi.object({
    id: Joi.number().required().min(1),
    name: Joi.string().required().min(2).max(30),
    price: Joi.number().required().min(0.01),
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

//Get listing by id

const getListingById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await listings.findListingById(id);
        if (response.length === 1) {
            res.status(200).json(response[0]);
        }
        else {
            res.status(400).json("Listing does not exist");
        }
    } catch (error) {
        res.status(500).json("Something went wrong");
    }

}

const getListingOwnerById = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        const response = await listings.findListingOwnerById(id);
        if (response.length === 1) {
            res.status(200).json(response[0].owner);
        }
        else {
            res.status(400).json("Listing does not exist");
        }
    } catch (error) {
        res.status(500).json("Something went wrong");
    }

}

//Get listings by owner

const getListingsbyOwner = async (req, res) => {
    try {
        const owner = req.params.owner;
        const response = await listings.findListingByOwner(owner);
        if (response) {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }

}

//Get listings by name for search

const getListingsByName = async (req, res) => {
    try {
        const name = req.params.name;
        const response = await listings.findListingByName(name);
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
            owner: req.body.owner,
            displayname: req.body.displayname
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

//Update listing

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
        res.status(201).json({ message: "Listing updated"})
    

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error[0]});
    }
}

//Delete listing

const deleteListing = async (req, res) => {

     try {

        const id = parseInt(req.params.id);
        const user = req.params.user;
        
        const ownerResponse = await listings.findListingOwnerById(id);

        const emailResponse = await users.findIdByEmail(user);

        if (emailResponse[0].id == ownerResponse[0].owner) {

            const response = await listings.deleteListingById(id);

            if (response.affectedRows === 1) {
            res.status(200).json({message: "Listing deleted succesfully"});
            } 

        } else if (emailResponse[0].id != ownerResponse[0].owner) {

            res.status(401).json({message: "You do not own the listing you are trying to delete!"});

        } 

    } catch (error) {
        res.status(500).json("Something went wrong");
    }
}


module.exports = {
    getAllListings,
    createNewListing,
    updateListingById,
    deleteListing,
    getListingById,
    getListingOwnerById,
    getListingsbyOwner,
    getListingsByName
  };    