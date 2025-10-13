import type { RequestHandler } from './$types';
import api from '$lib/server/api';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	let txCount = 0;
	try {
		txCount = await api.countTransactions();
	} catch {
		txCount = 0;
	}
	return json(txCount);
};
