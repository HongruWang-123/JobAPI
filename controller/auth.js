const userModel = require('../model/user');
const httpstatuscode = require('http-status-codes');
const BadRequestError = require('../errors/BadRequest');
const UnauthenticatedError = require('../errors/UnauthenticatedError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req,res) => {
    
    if(!req.body.email || !req.body.password){
        throw new BadRequestError('the email and password can not be empty');
    }

    const user = await userModel.findOne({email:req.body.email});
    if(!user){
        throw new UnauthenticatedError('provided invalid email and password')
    }

    const isMatch = await user.checkPassword(req.body.password);

    if(!isMatch){
        throw new UnauthenticatedError('provided invalid email and password')
    }

    const token = user.createToken();

    res.status(httpstatuscode.StatusCodes.OK).json({name:user.name, token});
}

const register = async (req,res) => {
    // if(!name || !email || !password){
    //     throw new BadRequestError('name, email and password can not be empty')
    // }
  
    const user = await userModel.create(req.body);
    const token = user.createToken();
    res.status(httpstatuscode.StatusCodes.CREATED).json({name:user.name, token ,msg:'register success'})
}

module.exports = {login,register}