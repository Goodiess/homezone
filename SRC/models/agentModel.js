import express from "express";
import { type } from "os";

const agentSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },

  password:{
    type: string,
    required: true
  },

  comfirmPassword:{
    type: string,
    required: true
  },

  phoneNumber:{
    type: string,
    rquired: true
  },

  email:{
    type: string,
    required: true
  }
});

const Agent = mongoose.model('Agent', agentSchema)
export default Agent