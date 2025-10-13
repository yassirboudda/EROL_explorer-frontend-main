import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is 'address' | 'contract' | 'token' => {
	return ['address', 'contract', 'token'].includes(param);
}) satisfies ParamMatcher;
