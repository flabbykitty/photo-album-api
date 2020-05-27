/**
 * Photo controller
 */

const {Photo} = require('../models');


/**
 * Show all the photos
 */
const index = async (req, res) => {
    const all_photos = await Photo.fetchAll()
    res.send({
        status: 'success',
        data: {
            photos: all_photos
        }
    })
}

/**
 * Show a specific photo
 */
const show = async (req, res) => {
    const photo = await new Photo({id: req.params.photoId}).fetch()

    res.send({
        status: 'success',
        data: {
            photo
        }
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