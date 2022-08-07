const httpstatuscode = require('http-status-codes');
const CustomAPIError = require('./CustomAPIError');
class UnauthenticadedError extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode = httpstatuscode.StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthenticadedError;
