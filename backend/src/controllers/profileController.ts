import { Request, Response } from 'express';
import { Profile } from '../models/Profile';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get user profiles
// @route   GET /api/profiles
// @access  Private
export const getProfiles = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const profiles = await Profile.find({ user: req.user?._id });
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching profiles' });
    }
};

// @desc    Create a profile
// @route   POST /api/profiles
// @access  Private
export const createProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, avatar, isKids } = req.body;

        // Check limit
        const profileCount = await Profile.countDocuments({ user: req.user?._id });
        if (profileCount >= 5) {
            res.status(400).json({ message: 'Maximum 5 profiles allowed' });
            return;
        }

        const profile = new Profile({
            user: req.user?._id,
            name,
            avatar,
            isKids,
        });

        const createdProfile = await profile.save();
        res.status(201).json(createdProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error creating profile' });
    }
};
