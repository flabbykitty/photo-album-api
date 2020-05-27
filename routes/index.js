/**
 * Index routes
 */

var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
	res.send({status: 'this is my inlämningsuppgift'})
})

router.use('/photos', require('./photos_routes'))
router.use('/albums', require('./albums_routes'))

// router.post('/register')

module.exports = router;
