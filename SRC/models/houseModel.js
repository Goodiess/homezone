import express from "express";
import { number } from "zod";

const houseSchema = mongoose.Schema({
    postedBy:{
      type: mongoose.Schema.Type.ObjectId,
      ref: "Agent",
      required: true,
    },
    img:{
        type: [],
        required: true
    },
    
    location:{
      type: string,
      required: true
    },

    price:{
      type: number,
      required: true
    },

    houseType:{
      type: string,
      required: true
  },

})

const House = mongoose.model('House', houseSchema)
export default House