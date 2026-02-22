import express from 'express';
import { getProfiles, createProfile } from '../controllers/profileController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getProfiles).post(protect, createProfile);

export default router;
