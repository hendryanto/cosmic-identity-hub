import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});