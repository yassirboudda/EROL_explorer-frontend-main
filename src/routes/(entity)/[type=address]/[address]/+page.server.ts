import type { PageServerLoad } from './$types';
import api from '$lib/server/api';
import { redirect } from '@sveltejs/kit';
import { calculateTotalPages, getPaginationParams } from '$lib/server/pagination';

export const load: PageServerLoad = async ({ params, url }) => {
	const { skip, limit } = getPaginationParams(url);
	const [entity, { transactions, total }] = await Promise.all([
		api.resolveEntity(params.address),
		await api.getTransactions({
			skip,
			limit,
			address: params.address
		})
	]);

	const urlPath = `/${entity.kind}/${params.address ?? ''}`;
	if (['address', 'contract', 'token'].includes(entity.kind) && !url.pathname.startsWith(urlPath)) {
		throw redirect(301, urlPath);
	}

	return {
		entity: entity.data,
		kind: entity.kind,
		transactions,
		total,
		totalPages: calculateTotalPages(total, limit)
	};
};
