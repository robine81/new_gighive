const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')

const uploader = require('../middleware/cloudinary.config');



/* GET add festival*/ 
router.get('/add-festival', isLoggedIn, async (req, res, next) => {
  try{
    console.log('req.session.user: ', req.session.user)
    const allFestivals = await Festival.find()
    res.render('festival/add-festival', {allFestivals});
  } 
  catch(err)
  {
    console.err('There was an error in adding festival: ', err)
  }
});

/* POST add festival*/ 
router.post('/add-festival', isLoggedIn, uploader.single('imageUrl'), async (req, res, next) => {  
  try {
    const {name, venue, textInfo, genre, date, socialMedia} = req.body
    const imageUrl = req.file.path

    // Check that name, venue, genre, date are provided
    if (name === '' || venue === '' || genre === '' || date === '' || imageUrl === '') {
      res.status(400).render('festival/add-festival', {
        errorMessage: 'Please provide the name of the festival, venue, genre, date and artwork. These fields are mandatory.',
      })
    }
    
    // Search the database for a festival with the name submitted in the form
    const foundFestival = await Festival.findOne({ name })
    const createdBy = req.session.user._id

    console.log(foundFestival)
    
    // If the festival is found, send the message festival is taken
    if (foundFestival) {
      return res.status(400).render('festival/add-festival', { errorMessage: 'Festival already in there.' })
    } else 
    {
      const createdFestival = await Festival.create({
        name,
        venue,
        textInfo,
        genre,
        date,
        imageUrl,
        socialMedia,
        createdBy
      })
      res.render('festival/festival-added', {createdFestival});
    }
  }
  catch(error) 
  {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).render('festival/add-festival', { errorMessage: error.message })
    }
    return res.status(500).render('festival/add-festival', { errorMessage: error.message })
  }
})

/* GET edit festival */
router.get("/edit-festival/:festivalId", isLoggedIn, async (req, res) => {
  try {
    const festivalToEdit = await Festival.findById(req.params.festivalId)
    
    const allFestivals = await Festival.find();
    res.render("festival/edit-festival", { festivalToEdit, allFestivals });
  } catch (err){
    console.error('There is an error with the edit festival page' , err)
  }  
});

/* POST festival edited */
  router.post("/edit-festival/:festivalId", isLoggedIn, uploader.single('imageUrl'), async (req, res, next) => {
    try {    
      const festivalId = req.params.festivalId
      const {name, venue, textInfo, genre, date, socialMedia} = req.body
      const imageUrl = req.file.path
      const updatedfestival = await Festival.findByIdAndUpdate(festivalId, {name, venue, textInfo, genre, date, imageUrl, socialMedia}, {new: true,});
      res.redirect("/profile");
    } catch (err){
      console.error('There is an error with the edit festival page' , err)
    }
  });

/* GET delete festival */
router.get("/delete-festival/:festivalId", isLoggedIn, async (req, res) => {
  try {
    const { festivalId } = req.params
    await Festival.findByIdAndDelete(festivalId);    
    res.redirect("/profile");
  } catch (err){
    console.error('There is an error with the edit festival page' , err)
  }  
});

/* GET one festival page with ID*/ 
router.get('/:festivalId', async (req, res) => {
  try {
    const oneFestival = await Festival.findById(req.params.festivalId)
    //const user = await User.findById(req.params.festivalId)
  
    const allFestivals = await Festival.find();
    res.render("festival/festival", { oneFestival, allFestivals });
  } catch (err){
    console.error('There is an error with the edit festival page' , err)
  }  
  });
  
module.exports = router