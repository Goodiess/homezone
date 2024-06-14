import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    postedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    img:{
        type: [String],
        required: true
    },
    
    location:{
      type: String,
      required: true
    },

    price:{
      type: String,
      required: true
    },

    houseType:{
      type: String,
      required: true
  },

})

const Post = mongoose.model('Post', postSchema)
export default Post