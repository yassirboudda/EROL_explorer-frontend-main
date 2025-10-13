import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	if (!(params as any)?.address) {
		throw redirect(301, '/');
	}
	return {};
};
