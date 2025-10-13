import type { PageServerLoad } from './$types';
import api from '$lib/server/api';
import { getPaginationParams, calculateTotalPages } from '$lib/server/pagination';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const { skip, limit } = getPaginationParams(url);
		const totalCount = await api.countBlocks();

		return {
			blocks: await api.getBlocks({
				skip,
				limit
			}),
			totalPages: calculateTotalPages(totalCount, limit)
		};
	} catch {
		return {
			blocks: [],
			totalPages: 0
		};
	}
};
