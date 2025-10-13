import { EXPLORER_API_URL } from '$env/static/private';
import { calculateTotalPages } from '$lib/server/pagination';

type Params = { [k: string]: string | number | boolean };

const api = {
	/** Request utility **/
	request: async (path: string, params: Params = {}) => {
		try {
			const queryParams = new URLSearchParams(
				Object.entries(params).map(([k, v]) => [k, String(v)])
			).toString();
			const result = await fetch(`${EXPLORER_API_URL}${path}?${queryParams}`);
			if (result.status !== 200) {
				return {};
			}
			return result.json();
		} catch {
			return {};
		}
	},

	/** Entities **/
	resolveEntity: async (identifier: string, full = false) => {
		return await api.request(`/entity/resolve/${identifier}`, { full });
	},

	/** Blocks **/
	getBlocks: async (params: Params = {}) => {
		return await api.request('/blocks', params);
	},

	getBlock: async (number: number, params: Params = {}) => {
		return await api.request(`/block/${number}`, params);
	},

	countBlocks: async () => {
		return await api.request('/blocks/count');
	},

	/** Transactions **/
	getTransactions: async (params: Params = {}) => {
		return await Promise.all([
			api.request('/transactions', params),
			api.request('/transactions/count', params)
		])
			.then((res) => ({
				transactions: Array.isArray(res[0]) ? res[0] : [],
				total: !isNaN(Number(res[1])) ? res[1] : 0,
				totalPages: calculateTotalPages(res[1], 10)
			}))
			.catch(() => ({
				transactions: [],
				total: 0,
				totalPages: 1
			}));
	},

	getTransaction: async (hash: string) => {
		return await api.request(`/transaction/${hash}`);
	},

	countTransactions: async () => {
		return await api.request('/transactions/count');
	},

	getTransactionsChart: async (params: Params = {}) => {
		return await api.request('/transactions/chart', params);
	}
};
export default api;
