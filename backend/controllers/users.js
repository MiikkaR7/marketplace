const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const users = require('../models/users');

//Input validation schemas

const userSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required().min(6),
  password: Joi.string().required().min(8)
})

const loginSchema = Joi.object({
  email: Joi.string().required().min(6),
  password: Joi.string().required().min(8)
})


const signUpUser = async (req, res) => {

  //Validation 

  const { error } = userSchema.validate(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
  
  const { name, email, password } = req.body;

  //Check if credentials already exist, then create new user
  
  try {
    const results = await users.findByEmail(email);
    if (results.length > 0) {
      return res.status(422).json({ message: "Could not create user, user exists" });
    } 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  const newUser = {
    id: v4(),
    name,
    email,
    hashed_password: hashedPassword,
    admin: 0
  }
  try {
    const result = await users.create(newUser);
    if (!result) {
        res.status(500).json({ message: error.message });
    } 
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h'}
    )   
    
    res.status(201).json(
      { 
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const loginUser = async (req, res) => {

  //Validation 

  const { error } = loginSchema.validate(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
  const { email, password } = req.body;
  
  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if(!result[0]) {
      return res.status(401).json({ message: "Could not identify user, credentials might be wrong" });
    }
    identifiedUser = result[0];
  } catch (error) {
    return res.status(500).json({message: "Something went wrong" });
  }
  try {
    // Comparing password with hash
    const valid = await bcrypt.compare(password, identifiedUser.hashed_password);
    if (!valid) {
      return res.status(401).json({ message: "Could not identify user, credentials might be wrong" });
    }
    // Create and return the token
    const token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h'}
    )
    
    res.status(201).json(
      { 
        id: identifiedUser.id,
        name: identifiedUser.name,
        email: identifiedUser.email,
        token
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong with login" });
  }
}
module.exports = {
  loginUser,
  signUpUser
}