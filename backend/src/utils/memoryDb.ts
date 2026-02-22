import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const startMongoMemoryServer = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log(`[MongoMemoryServer] Started on: ${uri}`);
    return uri;
};

export const stopMongoMemoryServer = async () => {
    if (mongod) {
        await mongod.stop();
        console.log('[MongoMemoryServer] Stopped');
    }
};
