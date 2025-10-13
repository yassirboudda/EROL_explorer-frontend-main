import type { RequestHandler } from './$types';
import api from '$lib/server/api';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, url }) => {
	return json(await api.resolveEntity(params.identifier, !!url.searchParams.get('full')));
};
