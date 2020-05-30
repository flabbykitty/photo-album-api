/**
 * Authentication middleware
 */

const jwt = require('jsonwebtoken')
 

/**
 * Validate JWT
 */

const validateJWT = async (req, res, next) => {
    const token = getTokenFromHeaders(req);
	if(!token) {
		res.status(401).send({
			status: 'fail',
			data: "No token found in request headers"
		})
		return
	}
	
	let payload = null
	try {
		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
	} catch(error) {
		res.status(403).send({
			status: 'fail',
			data: "Authentication failed"
		})
		throw error
	}

	req.user = payload
	next()
}



/**
 * Get token from http headers
 */

const getTokenFromHeaders = (req, res) => {
    if(!req.headers.authorization) {
        return false
    }

    const [authType, token] = req.headers.authorization.split(' ')

    if(authType.toLowerCase() !== 'bearer') {
        return false
    }

    return token
} 

module.exports = {
    validateJWT
}