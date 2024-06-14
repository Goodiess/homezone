import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },

  comfirmPassword:{
    type: String,
    required: true
  },

  phoneNumber:{
    type: String,
    rquired: true
  },


});

const client = mongoose.model('client', userSchema)
export default client;