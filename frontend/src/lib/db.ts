import mongoose from 'mongoose';

let MONGODB_URI = process.env.MONGO_URI;

// If Vercel has the localhost string from previous instructions, force the real Atlas cloud string instead
if (!MONGODB_URI || MONGODB_URI.includes('127.0.0.1') || MONGODB_URI.includes('localhost')) {
    MONGODB_URI = "mongodb+srv://pramod369369369_db_user:9aTAyUyoBXHzDEFJ@cluster0.z4fagax.mongodb.net/netflix_clone?appName=Cluster0";
}

if (!MONGODB_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        let uri = MONGODB_URI!;

        cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
