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

    const albums = await user.related('albums').where({id:req.params.albumId}).fetch({withRelated: 'photos'})

	res.send({
		status: "success",
		data: {
			albums
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

module.exports = {
    index,
    show,
    store,
}