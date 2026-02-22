import mongoose, { Document, Schema } from 'mongoose';

export interface IList extends Document {
    title: string;
    type: string;
    genre: string;
    content: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ListSchema: Schema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        type: { type: String }, // 'movie' or 'series'
        genre: { type: String },
        content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    },
    { timestamps: true }
);

export const List = mongoose.model<IList>('List', ListSchema);
