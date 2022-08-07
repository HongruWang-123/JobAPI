const httpstatuscode = require('http-status-codes');
const CustomAPIError = require('./CustomAPIError');
class BadRequest extends CustomAPIError {
    constructor(message){
        super(message);
        this.statusCode = httpstatuscode.StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequest;