import type { PageServerLoad } from './$types';
import api from '$lib/server/api';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const entity = await api.resolveEntity(params.hash, true);
		if (entity.kind === 'tx') {
			return {
				tx: entity.data
			};
		} else {
			return { tx: null };
		}
	} catch {
		return { tx: null };
	}
};
