import express from 'express';
import { createComment, getCommentById, updateComment, deleteComment } from '../controllers/commentController.js'; // Adjust the import path as necessary
import protectRoute from '../middlewares/protectedRoute.js';
const router = express.Router();

router.post('/',protectRoute, createComment);
router.get('/:id',protectRoute, getCommentById);
router.put('/:id',protectRoute, updateComment);
router.delete('/:id',protectRoute, deleteComment);

export default router;
