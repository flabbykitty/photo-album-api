/**
 * Albums routes
 */

const express = require('express')
const router = express.Router()

const {createAlbumRules} = require('../validation/validation')
const {index, show, store} = require('../controllers/album_controller')

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

 module.exports = router