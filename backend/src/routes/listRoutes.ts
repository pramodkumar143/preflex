import express from 'express';
import { getLists, createList } from '../controllers/listController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getLists).post(protect, createList);

export default router;
