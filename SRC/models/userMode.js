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

  phoneNumber:{
    type: String,
    rquired: true
  },

  role: {
    type: String,
    default: "Client"
  }


});

const Client = mongoose.model('Client', userSchema)
export default Client;