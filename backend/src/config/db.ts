import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { startMongoMemoryServer } from '../utils/memoryDb';

dotenv.config();

export const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI as string;

        // If it's a localhost URL, attempt to use the in-memory server instead
        // to avoid crashing for users without MongoDB installed locally.
        if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
            console.log('Detected localhost MongoDB URI. Starting Memory Server...');
            uri = await startMongoMemoryServer();
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.log('\n================ DB ERROR ================');
        console.log('Error Message:', error.message);
        console.log('Error Code:', error.code);
        console.log('==========================================\n');
        process.exit(1);
    }
};
