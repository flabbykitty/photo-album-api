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

    const photos = await user.related('photos').where({id:req.params.photoId}).fetch()

	res.send({
		status: "success",
		data: {
			photos
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

module.exports = {
    index,
    show,
    store,
}