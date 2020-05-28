/**
 * Photos routes
 */

const express = require('express')
const router = express.Router()

const {createPhotoRules} = require('../validation/validation')

const {index, show, store} = require('../controllers/photo_controller')

/**
 * GET /
 * 
 * Shows all the photos
 * 
 */

 router.get('/', index)

 /**
 * GET /:photoId
 * 
 * Shows a specific photo
 * 
 */

router.get('/:photoId', show)


/**
 * POST /
 * 
 * Adds a new photo
 * 
 */

router.post('/', createPhotoRules, store)

 module.exports = router