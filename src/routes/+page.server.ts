import type { PageServerLoad } from './$types';
import api from '$lib/server/api';

export const load: PageServerLoad = async () => {
	try {
		return {
			latestBlocks: await api.getBlocks(),
			latestTxs: await api.getTransactions().then((res) => res.transactions),
			latestTxsChart: await api.getTransactionsChart({ days: 30 }),
			txsCount: await api.countTransactions()
		};
	} catch {
		return {
			apiError: true,
			latestBlocks: [],
			latestTxs: [],
			latestTxsChart: [],
			txsCount: 0
		};
	}
};
