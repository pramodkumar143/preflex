import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    genre: string;
    duration: string;
    year: number;
    maturityRating: string;
    cast: string[];
    director: string;
    category: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const MovieSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        videoUrl: { type: String, required: true },
        thumbnailUrl: { type: String, required: true },
        genre: { type: String },
        duration: { type: String },
        year: { type: Number },
        maturityRating: { type: String, default: 'PG-13' },
        cast: [{ type: String }],
        director: { type: String },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    { timestamps: true }
);

export const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
