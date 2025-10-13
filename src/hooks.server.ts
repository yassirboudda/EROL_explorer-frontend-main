import { DB_STRING, DB_NAME } from '$env/static/private';
import mongoose from 'mongoose';

let connection: mongoose.Mongoose | null = null;

export async function handle({ resolve, event }) {
	// Database
	if (!connection || connection.connection.readyState !== 1) {
		try {
			connection = (await mongoose.connect(
				DB_STRING as string,
				{
					dbName: DB_NAME,
					bufferCommands: false,
					socketTimeoutMS: 2000,
					serverSelectionTimeoutMS: 2000
				} as mongoose.ConnectOptions
			)) as mongoose.Mongoose;
		} catch (e) {
			console.error('> Database error');
			console.error(e);
			throw new Error('Database connection failed');
		}
	}
	return resolve(event);
}
