const jobModel = require('../model/job.js');
const BadRequest = require('../errors/BadRequest');
const UnauthenticatedError = require('../errors/UnauthenticatedError');
const NotFoundError = require('../errors/NotFoundError');
const httpstatuscode = require('http-status-codes');

const getAllJobs = async (req,res) => {
    const jobs = await jobModel.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(httpstatuscode.StatusCodes.OK).json({jobs})
}

const getJob = async (req,res) => {
    const job = await jobModel.findOne({_id:req.params.id, createdBy:req.user.userId})
    if(!job){
        throw new NotFoundError(`invalid job id ${req.params.id}`);
    }
    res.status(httpstatuscode.StatusCodes.OK).json({job})
}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const job = await jobModel.create(req.body);
    res.status(httpstatuscode.StatusCodes.CREATED).json({job})
}

const updateJob = async (req,res) => {
    if(!req.body.company || !req.body.position){
        throw new BadRequest('company or position is empty')
    }
    const job = await jobModel.findOneAndUpdate({_id:req.params.id, createdBy: req.user.userId},req.body,{new:true,runValidators:true})
    if(!job){
        throw new NotFoundError(`invalid job id ${req.params.id}`);
    }
    res.status(httpstatuscode.StatusCodes.OK).json({job})
}

const deleteJob = async (req,res) => {
    const job = await jobModel.findOneAndDelete({_id:req.params.id,createdBy:req.user.userId});
    if(!job){
        throw new NotFoundError(`invalid job id ${req.params.id}`);
    }
    res.status(httpstatuscode.StatusCodes.OK).json({job})
}



module.exports = {getAllJobs,getJob,createJob,updateJob,deleteJob}