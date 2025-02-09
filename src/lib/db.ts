// lib/mongodb.js
import mongoose from 'mongoose';

const MONGO_DB_URL = process.env.MONGO_DB_URL!;

if (!MONGO_DB_URL) {
    throw new Error('Please define the MONGO_DB_URL environment variable');
}

/** 
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        cached.promise = mongoose.connect(MONGO_DB_URL, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.log("=============== error while db:connection", error);
        throw error;
    }

    console.log("=============== database connection successfully connected");
    return cached.conn;

}

export default dbConnect;