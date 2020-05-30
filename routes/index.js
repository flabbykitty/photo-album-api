/**
 * Index routes
 */

const express = require('express');
const router = express.Router();

const {createUserRules} = require('../validation/validation')
const userController = require('../controllers/user_controller')
const auth = require('../controllers/middleware/auth')

/* GET home page */
router.get('/', (req, res) => {
	res.send({status: 'This is my inlämningsuppgift'})
})

router.post('/register', [createUserRules], userController.register)
router.post('/login', userController.login)

router.use(auth.validateJWT)

router.use('/photos', require('./photos_routes'))
router.use('/albums', require('./albums_routes'))


module.exports = router;
