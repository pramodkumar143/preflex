import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';

// @desc    Upload media to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

        const resourceType = req.file.mimetype.startsWith('video') ? 'video' : 'image';

        const result = await cloudinary.uploader.upload(dataURI, {
            resource_type: resourceType,
            folder: 'netflix_clone',
        });

        res.status(200).json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file' });
    }
};
