import mongoose from "mongoose";


const agentSchema = mongoose.Schema({
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

  // confirmPassword:{
  //   type: String,
  //   // required: true
  // },
  // phoneNumber:{
  //   type: string,
  //   rquired: true
  // },

  role: {
    type: String,
    default: 'Agent'
  }
});

const Agent = mongoose.model('Agent', agentSchema)
export default Agent