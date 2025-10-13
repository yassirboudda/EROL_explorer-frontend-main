import type { PageServerLoad } from './$types';
import api from '$lib/server/api';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { data, kind } = await api.resolveEntity(params.number);
		return {
			block: data,
			transactions: data.transactions,
			kind
		};
	} catch (e: any) {
		if (e.status >= 300 && e.status <= 399) {
			throw redirect(e.status, e.location);
		}
		return {
			block: null,
			kind: null,
			transactions: []
		};
	}
};
