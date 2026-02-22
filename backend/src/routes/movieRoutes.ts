import express from 'express';
import { getMovies, getMovieById, createMovie } from '../controllers/movieController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getMovies).post(protect, createMovie);
router.route('/:id').get(getMovieById);

export default router;
