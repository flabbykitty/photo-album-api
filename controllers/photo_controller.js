/**
 * Photo controller
 */

const {User, Photo} = require('../models');

const {matchedData, validationResult} = require('express-validator')


/**
 * Show all the photos
 */
const index = async (req, res) => {
	let user = null
	try {
		user = await new User({id: req.user.id}).fetch({withRelated: 'photos'})
	} catch(error) {
		res.status(404)
		return
    }
    
	const photos = user.related('photos')

	res.send({
		status: "success",
		data: {
			photos
		},
	})
}

/**
 * Show a specific photo
 */
const show = async (req, res) => {
	let user = null
	try {
		user = await new User({id: req.user.id}).fetch({withRelated: 'photos'})
	} catch(error) {
		res.status(404)
		return
	}

	const photo = await user.related('photos').where({id:req.params.photoId}).fetch()
	
	if(photo.isEmpty()) {
		res.sendStatus(404)
	}

	res.send({
		status: "success",
		data: {
			photo
		},
	})
}



/**
 * Add a new photo
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
		const photo = await Photo.forge(validData).save()

		res.send({
			status: 'success',
			data: {
				photo
			}
		})
	} catch(error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when trying to add a new photo'
		})
		throw error

	}
}



/**
 * Delete a specific photo
 */
const destroy = async (req, res) => {

	const user = await new User({id: req.user.id}).fetch({withRelated: 'photos'})

	photo = await user.related('photos').where({id:req.params.photoId}).fetch()

	if(photo.isEmpty()) {
		res.sendStatus(404)
		return
	}
	
	photo = await new Photo({id: req.params.photoId})
	
	photo.albums().detach()
		.then(async () => {
			await new Photo({id: req.params.photoId}).destroy()
			res.sendStatus(204)
		})
		.catch(() => {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown in database when trying to delete a photo'
			})
			return
		})
}

module.exports = {
	destroy,
    index,
    show,
    store,
}