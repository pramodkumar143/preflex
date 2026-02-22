import { Request, Response } from 'express';
import { Movie } from '../models/Movie';

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
export const getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching movies' });
    }
};

// @desc    Get a single movie by ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching movie' });
    }
};

// @desc    Create a new movie (Admin only)
// @route   POST /api/movies
// @access  Private/Admin
export const createMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, videoUrl, thumbnailUrl, genre, duration, year, maturityRating, cast, director, category } = req.body;

        const movie = new Movie({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            genre,
            duration,
            year,
            maturityRating,
            cast,
            director,
            category,
        });

        const createdMovie = await movie.save();
        res.status(201).json(createdMovie);
    } catch (error) {
        res.status(500).json({ message: 'Server Error creating movie' });
    }
};
