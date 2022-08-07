const jwt = require('jsonwebtoken');
const UnauthenticadedError = require('../errors/UnauthenticatedError');

const auth = (req,res,next) => {
    const authorization = req.headers.authorization;
    if(!authorization || !authorization.startsWith("Bearer ")){
        throw new UnauthenticadedError('no JWT token provided');
    }

    const token = req.headers.authorization.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_Secret)
        req.user = {userId: payload.id, name:payload.name};
        next();
    } catch (error) {
        throw new UnauthenticadedError('JWT authenticated invalid');
    }
}

module.exports = auth;