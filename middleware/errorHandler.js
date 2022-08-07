const httpstatuscode = require('http-status-codes');
const errorHandlerMiddleware = (err,req,res,next) => {
    let customerror = {
        statusCode: err.statusCode || httpstatuscode.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'internal error'
    }

    if(err.name && err.name === 'ValidationError'){
        customerror.statusCode = httpstatuscode.StatusCodes.BAD_REQUEST;
        customerror.msg = Object.values(err.errors).map((item) => {return item.message}).join(' , ')
    }

    if(err.name && err.name === 'CastError'){
        customerror.statusCode = httpstatuscode.StatusCodes.NOT_FOUND;
        customerror.msg = `No object with id ${err.value}`;
    }

    if(err.code && err.code === 11000){
        return res.status(400).json({msg:`duplicate value on ${Object.keys(err.keyValue)}`});
    }
     
    return res.status(customerror.statusCode).json({msg:customerror.msg});
}

module.exports = errorHandlerMiddleware