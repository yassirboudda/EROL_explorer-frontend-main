import type { PageServerLoad } from './$types';
import api from '$lib/server/api';
import { getPaginationParams, calculateTotalPages } from '$lib/server/pagination';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const { skip, limit } = getPaginationParams(url);
		const { transactions, total } = await api.getTransactions({
			skip,
			limit
		});

		return {
			txs: transactions,
			total,
			totalPages: calculateTotalPages(total, limit)
		};
	} catch {
		return {
			txs: [],
			totalPages: 0
		};
	}
};
