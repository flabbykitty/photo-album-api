const {body} = require('express-validator')

const createRules = [
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 5}),
    body('first_name').exists().trim().not().isNumeric(),
    body('last_name').exists().trim().not().isNumeric()
]

module.exports = {
    createRules
}