const httpstatuscode = require('http-status-codes');
const CustomAPIError = require('./CustomAPIError');
class NotFoundError extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode = httpstatuscode.StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;