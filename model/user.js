const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
   name:{
    type: String,
    required: [true,'use\'s name can not be empty'],
    minlength:3,
    maxlength:50
   },
   email:{
    type:String,
    required: [true,'email can not be empty'],
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
    'Please fill a valid email address'],
    unique: true
   },
   password:{
    type:String,
    required:[true,'password can not be empty'],
    minlength:6
   }

})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
})

userSchema.methods.createToken = function(){
  return jwt.sign({name:this.name, id: this._id},process.env.JWT_Secret, {
    expiresIn: process.env.JWT_LIFETIME
});
}

userSchema.methods.checkPassword = async function(passedpassword){
  const isMatch = await bcrypt.compare(passedpassword,this.password)
  return isMatch
}

module.exports = mongoose.model('user',userSchema);