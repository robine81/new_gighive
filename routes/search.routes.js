const express = require('express')
const router = express.Router()

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

/* GET Search page */
router.get('/', async (req, res, next) => {
  try {
    console.log(req.query)
    const allFestivals = await Festival.find()
    res.render('search-result', {allFestivals});
  }
  catch(err){
    console.error('There was an error in searching festival: ', err)
  }
  })

  module.exports = router