/**
 * Album controller
 */

const {Album, User} = require('../models')

const {matchedData, validationResult} = require('express-validator')

/**
 * Show all the albums
 */
const index = async (req, res) => {
    let user = null
	try {
        user = await new User({id: req.user.id}).fetch({withRelated: 'albums'})
	} catch(error) {
		res.status(404)
		return
    }
    
	const albums = user.related('albums')

	res.send({
		status: "success",
		data: {
			albums
		},
	})
}

/**
 * Show a specific album
 */
const show = async (req, res) => {

    let user = null
	try {
		user = await new User({id: req.user.id}).fetch({withRelated: 'albums'})
	} catch(error) {
		res.status(404)
		return
	}

	const album = await user.related('albums').where({id:req.params.albumId}).fetch({withRelated: 'photos'})
	
	if(album.isEmpty()) {
		res.sendStatus(404)
	}

	res.send({
		status: "success",
		data: {
			album
		},
	})
}

/**
 * Add an album
 */
const store = async (req, res) => {
    const errors = validationResult(req)
	if(!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors.array()
		})
		return
	}
	
	const validData = matchedData(req)
	validData.user_id = req.user.id

	
	try {
		const album = await Album.forge(validData).save()

		res.send({
			status: 'success',
			data: {
				album
			}
		})
	} catch(error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when trying to add a new album'
		})
		throw error
	}
}


/**
 * Add a photo to an album
 */
const addPhotoToAlbum = async (req, res) => {
	const errors = validationResult(req)
	if(!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors.array()
		})
		return;
	}

	const validData = matchedData(req)

	// Check if the user owns both the album and the photo
	const user = await new User({id: req.user.id}).fetch({withRelated: ['albums', 'photos']})

	const album = await user.related('albums').where({id:req.params.albumId}).fetch()


	let photos = null

	if(!Array.isArray(validData.photo_id)) {
		photos = await user.related('photos').where({id: validData.photo_id}).fetch()
	} else {
		photos = await user.related('photos').where("id", "IN", validData.photo_id).fetch()
	}


	if(album.isEmpty() || photos.isEmpty()) {
		res.sendStatus(404)
		return
	}


	try {
		const album = await new Album({id: req.params.albumId})

		await photos.forEach(async p => {
			await album.photos().attach(p.id)
		})

		res.sendStatus(201)

	} catch(error) {
		res.status(500).send({
			status: 'error',
			message: 'Error thrown in database when trying to add photo to album'
		})
		throw error
	}
}


/**
 * Delete a specific album
 */
const destroy = async (req, res) => {

	const user = await new User({id: req.user.id}).fetch({withRelated: 'albums'})

	album = await user.related('albums').where({id:req.params.albumId}).fetch()

	if(album.isEmpty()) {
		res.sendStatus(404)
		return
	}
	
	album = await new Album({id: req.params.albumId})
	
	album.photos().detach()
		.then(async () => {
			await new Album({id: req.params.albumId}).destroy()
			res.sendStatus(204)
		})
		.catch(() => {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown in database when trying to delete an album'
			})
			return
		})
}

module.exports = {
	addPhotoToAlbum,
	destroy,
    index,
    show,
    store,
}