const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./headers');

module.exports = (req,res,next) => {
	//check if there is token in the body, a url parameter, or the request headers
	 let newToken = req.body.token || req.params.token || req.headers['authorization'];
	 let token = newToken.split(' ').pop()
	    if (token) {
			//if there is a token try and decode it with the key that was used to encrypt it
			jwt.verify(token, SECRET_KEY, (err, decoded) => {
	            if (err) {
	                return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
	            } else {
					data = decoded;
					next();
	            }
	        });
	    } else {
			//if there is no token send an error
	        return res.status(403).send({
	            success: false,
	            message: 'No token provided.'
	        });
	    }
};