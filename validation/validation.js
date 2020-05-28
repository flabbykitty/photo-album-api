/**
 * Validation rules
 */

const {body} = require('express-validator')

const createUserRules = [
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 5}),
    body('first_name').exists().trim().not().isNumeric(),
    body('last_name').exists().trim().not().isNumeric()
]

const createPhotoRules = [
    body('title').trim().isLength({min: 3}),
    body('url').trim().isURL(),
    body('comment')
]


const createAlbumRules = [
    body('title').trim().not().isEmpty(),

]


module.exports = {
    createAlbumRules,
    createPhotoRules,
    createUserRules
}