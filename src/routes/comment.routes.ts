import { Router } from 'express';
import { getProductComments, deleteComment } from '../controllers/comment.controller';

const router = Router();

router.get('/products/:id/comments', getProductComments);
router.delete('/comments/:id', deleteComment);

export default router;