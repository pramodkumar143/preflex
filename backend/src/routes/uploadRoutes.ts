import express from 'express';
import { uploadMedia } from '../controllers/uploadController';
import { protect } from '../middleware/authMiddleware';
import upload from '../utils/multer';

const router = express.Router();

router.post('/', protect, upload.single('media'), uploadMedia);

export default router;
