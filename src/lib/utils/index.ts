import { PUBLIC_RPC_URL } from '$env/static/public';

export * from '$lib/utils/format';
export * from '$lib/utils/transaction';
export * from '$lib/utils/contract';

export const isFullyIndexed = () => {
	if (!PUBLIC_RPC_URL) return true;
	return PUBLIC_RPC_URL !== 'https://martian-rpc1.amichain.org';
};