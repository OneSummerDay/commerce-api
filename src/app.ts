import express from 'express';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

export default app;