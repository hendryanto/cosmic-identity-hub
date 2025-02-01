import express from 'express';
import pool from '../db';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all products');
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    console.log('Fetching products by category:', req.params.category);
    const [rows] = await pool.query('SELECT * FROM products WHERE category = ?', [req.params.category]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

// Get campaign products
router.get('/campaign', async (req, res) => {
  try {
    console.log('Fetching campaign products');
    const [rows] = await pool.query('SELECT * FROM products WHERE is_campaign = true LIMIT 3');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching campaign products:', error);
    res.status(500).json({ error: 'Failed to fetch campaign products' });
  }
});

export default router;