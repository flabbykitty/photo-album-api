/**
 * Album controller
 */


/**
 * Show all the albums
 */
const index = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where the albums will be'
    })
}

/**
 * Show a specific album
 */
const show = (req, res) => {
    res.send({
        status: 'success',
        data: 'This is where I will see a specific album'
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