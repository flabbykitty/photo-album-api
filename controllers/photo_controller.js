/**
 * Photo controller
 */

const {User} = require('../models');


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
const store = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where I will be able to add a new photo'
    })
}

module.exports = {
    index,
    show,
    store,
}