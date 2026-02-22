import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getCategories).post(protect, createCategory);

export default router;
