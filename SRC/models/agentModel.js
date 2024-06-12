import mongoose from "mongoose";


const agentSchema = mongoose.Schema({
  // name:{
  //   type: String,
  //   required: true
  // },
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
    // required: true
  }

  // phoneNumber:{
  //   type: string,
  //   rquired: true
  // },


});

const Agent = mongoose.model('Agent', agentSchema)
export default Agent