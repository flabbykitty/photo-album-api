/**
 * Albums routes
 */

const express = require('express')
const router = express.Router()

const {addPhotoToAlbumRules, createAlbumRules} = require('../validation/validation')
const {addPhotoToAlbum, index, show, store} = require('../controllers/album_controller')

/**
 * GET /
 * 
 * Shows all the albums
 * 
 */

router.get('/', index)

 /**
 * GET /:albumId
 * 
 * Shows a specific album
 * 
 */

router.get('/:albumId', show)


/**
 * POST /
 * 
 * Adds a new album
 * 
 */

router.post('/', createAlbumRules, store)


/**
 * POST /:albumId/photos
 * 
 * Adds a photo to an album
 */

 router.post('/:albumId/photos', addPhotoToAlbumRules, addPhotoToAlbum)

module.exports = router