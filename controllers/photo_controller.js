/**
 * Photo controller
 */

/**
 * Show all the photos
 */
const index = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where the photos will be'
    })
}

/**
 * Show a specifit photo
 */
const show = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where I will see a specific photo'
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