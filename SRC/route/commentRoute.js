import express from 'express';
import { createComment, getCommentById, updateComment, deleteComment } from '../controllers/commentController.js'; // Adjust the import path as necessary

const router = express.Router();

router.post('/', createComment);
router.get('/:id', getCommentById);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
