import { Request, Response } from 'express';
import { List } from '../models/List';

// @desc    Get all lists
// @route   GET /api/lists
// @access  Public
export const getLists = async (req: Request, res: Response): Promise<void> => {
    try {
        const { type, genre } = req.query;
        let query: any = {};

        if (type) query.type = type;
        if (genre) query.genre = genre;

        const lists = await List.aggregate([
            { $match: query },
            { $sample: { size: 10 } }
        ]);

        // Fallback if aggregate $sample doesn't work perfectly on small datasets,
        // we would normally just populate the references. Let's populate.
        const populatedLists = await List.populate(lists, { path: 'content' });

        res.json(populatedLists);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching lists' });
    }
};

// @desc    Create a list
// @route   POST /api/lists
// @access  Private/Admin
export const createList = async (req: Request, res: Response): Promise<void> => {
    try {
        const list = new List(req.body);
        const createdList = await list.save();
        res.status(201).json(createdList);
    } catch (error) {
        res.status(500).json({ message: 'Server Error creating list' });
    }
};
