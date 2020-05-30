/**
 * User controller
 */

const {User} = require('../models')
const bcrypt = require('bcrypt')
const {matchedData, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

/**
 * Get access token
 */
const login = async (req, res) => {
	const user = await User.login(req.body.email, req.body.password);
	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication required.',
		});
		return
	}

	const payload = {
		id: user.get('id'),
		email: user.get('email'),
	}

	const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

	res.send({
		status: 'success',
		data: {
			token
		}
	})
}

const register = async (req, res) => {
    const errors = validationResult(req)
	if(!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors.array()
		})
		return;
	}
    
    const validData = matchedData(req)

	try {
		validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds);
	}
	catch(error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to hash'
		})
		throw error
	}


	try{
		await User.forge(validData).save();
		res.status(201).send({
			status: 'success',
			data: null
		});
	}
	catch(error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when registering a new user'
		})
		throw error
    }
}


module.exports = {
	login,
    register
}
