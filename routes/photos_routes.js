/**
 * Photos routes
 */

const express = require('express')
const router = express.Router()

const {createPhotoRules} = require('../validation/validation')

const {destroy, index, show, store} = require('../controllers/photo_controller')

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


/**
 * DELETE /:photoId
 * 
 * Deletes a specifis photo
 * 
 */

router.delete('/:photoId', destroy)

 module.exports = router