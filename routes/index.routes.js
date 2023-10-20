const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

/* GET home page */
router.get("/", async (req, res, next) => {
  try { 
    const allFestivals = await Festival.find()
    const technoFestivals = await Festival.find({genre:'Techno'})
    const houseFestivals = await Festival.find({genre:'House'})
    const tranceFestivals = await Festival.find({genre:'Trance'})
    const sortedAscFestivals = await Festival.find().sort({name: 1})
    const sortedDescFestivals = await Festival.find().sort({name: -1})
    
    res.render("index", {allFestivals, technoFestivals, houseFestivals, tranceFestivals, sortedAscFestivals, sortedDescFestivals});
  } catch(err){
    console.error('There is an error with the index page' , err)
  }
});

router.get("/", isLoggedOut, async (req, res, next) => {
  try { 
    console.log('Is logged out')
    const allFestivals = await Festival.find()
    res.render("index", {allFestivals})
    
  } catch(err){
    console.error('There is an error with the index page' , err)
  }
});

module.exports = router;
