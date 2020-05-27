/**
 * Album controller
 */

const {User} = require('../models')

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
const store = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where I will be able to add an album'
    })
}

module.exports = {
    index,
    show,
    store,
}