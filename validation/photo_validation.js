const {body} = require('express-validator')

const newPhotoRules = [
    body('title').trim().isLength({min: 3}),
    body('url').trim().isURL(),
    body('comment')
]

module.exports = {
    newPhotoRules
}