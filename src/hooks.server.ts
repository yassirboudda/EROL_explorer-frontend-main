import { DB_STRING, DB_NAME } from '$env/static/private';
import mongoose from 'mongoose';

let connection: mongoose.Mongoose | null = null;

export async function handle({ resolve, event }) {
	const connectionString = DB_STRING as string | undefined;

	if (!connectionString) {
		return resolve(event);
	}

	if (!connection || connection.connection.readyState !== 1) {
		try {
			connection = (await mongoose.connect(
				connectionString,
				{
					dbName: DB_NAME,
					bufferCommands: false,
					socketTimeoutMS: 2000,
					serverSelectionTimeoutMS: 2000
				} as mongoose.ConnectOptions
			)) as mongoose.Mongoose;
		} catch (e) {
			console.error('> Database connection failed (non-blocking)');
			console.error(e);
			return resolve(event);
		}
	}
	return resolve(event);
}
