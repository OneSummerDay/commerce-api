import express from 'express';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);

export default app;