/**
 * Index routes
 */

const express = require('express');
const router = express.Router();

const {createRules} = require('../validation/user_validation')
const userController = require('../controllers/user_controller')

/* GET home page */
router.get('/', (req, res) => {
	res.send({status: 'this is my inlämningsuppgift'})
})

router.use('/photos', require('./photos_routes'))
router.use('/albums', require('./albums_routes'))

router.post('/register', [createRules], userController.register)

module.exports = router;
