import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    avatar: string;
    isKids: boolean;
    myList: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema: Schema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        isKids: {
            type: Boolean,
            default: false,
        },
        myList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie',
            },
        ],
    },
    { timestamps: true }
);

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
