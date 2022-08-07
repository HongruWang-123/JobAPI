const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
   company:{
    type:String,
    required:[true,'please provide company info'],
    maxlength:50
   },
   position:{
    type:String,
    required:[true,'please provide position info'],
    maxlength:50
   },
   status:{
    type:String,
    enum:['interview','declined','pending'],
    default:'pending'
   },
   createdBy:{
      type: mongoose.Types.ObjectId,
      ref:'User',
      required:[true,'please provide the user who created the job']
   }
},{timestamps:true})

module.exports = mongoose.model('job',jobSchema);