import mongoose from "mongoose";

const comment = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House", // assuming 'House' is the name of the house model
    required: true,
  },
});

const commentSchema = mongoose.model("commentSchema", comment);
export default commentSchema;
