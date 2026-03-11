import { Router } from 'express';
import { getProducts, createProduct, getProductById, updateProduct } from '../controllers/product.controller';


const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.patch('/:id', updateProduct);

export default router;