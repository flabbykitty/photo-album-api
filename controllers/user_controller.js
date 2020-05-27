/**
 * User controller
 */

const {User} = require('../models')
const bcrypt = require('bcrypt')
const {matchedData, validationResult} = require('express-validator')


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
    register
}
