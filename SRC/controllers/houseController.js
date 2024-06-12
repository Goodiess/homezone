import Agent from "../models/agentModel.js";

import House from "../models/houseModel.js";

import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const postedBy = req.house._id;

    if (!text) {
      return res.status(400).json({ error: "Text field is required: "});
    }

    const house = await House.findById(postedBy);
    if (!house) {
      return res.status(404).json({ error: "house not found" });
    }

    const maxlength = 1000;
    if (text.length > maxlength) {
      return res.status(400).json({ error: `Text should not exceed ${maxlength} characters 🐸🐸🐸🐸 `});
    }

    if (img) {
      const uploadedimg = await cloudinary.uploader.upload(img);
      img = uploadedimg.secure_url;
    }

    const newHouse = new House({
      postedBy,
      img,
      location,
      price,
      houseType,
      
    });

    await newHouse.save();
    res.status(201).json({ message: 'Post created successfully: ', newHouse });
    console.log('Post created successfully', newHouse);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error('Internal server error:', error);
  }
};

