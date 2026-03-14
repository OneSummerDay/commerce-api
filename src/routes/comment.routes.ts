import { Router } from 'express';
import { getProductComments } from '../controllers/comment.controller';

const router = Router();

router.get('/products/:id/comments', getProductComments);

export default router;