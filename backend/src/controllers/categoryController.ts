import { Request, Response } from 'express';
import { Category } from '../models/Category';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching categories' });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;

        const categoryExists = await Category.findOne({ name });

        if (categoryExists) {
            res.status(400).json({ message: 'Category already exists' });
            return;
        }

        const category = await Category.create({ name, description });
        res.status(201).json(category);

    } catch (error) {
        res.status(500).json({ message: 'Server Error creating category' });
    }
};
