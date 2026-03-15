import { Router } from 'express';
import { createPurchase } from '../controllers/purchase.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createPurchase);

export default router;