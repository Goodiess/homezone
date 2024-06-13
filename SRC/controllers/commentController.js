import Comment from '../models/commentModel.js'; // Adjust the import path as necessary

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { text, user, house } = req.body;
    const newComment = new Comment({ text, user, house });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user').populate('house');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single comment by ID
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('user').populate('house');
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const { text, user, house } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text, user, house },
      { new: true, runValidators: true }
    ).populate('user').populate('house');
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
