import { Router } from 'express';
import { createPurchase, getMyPurchases } from '../controllers/purchase.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createPurchase);
router.get('/my', authMiddleware, getMyPurchases);

export default router;