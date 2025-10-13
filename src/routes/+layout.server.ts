import type { LayoutServerLoad } from './$types';
import { PUBLIC_RPC_URL, PUBLIC_GAS_UNIT, PUBLIC_NATIVE_SYMBOL } from '$env/static/public';

export const load: LayoutServerLoad = async () => {
	return {
		rpcUrl: PUBLIC_RPC_URL,
		gasUnit: PUBLIC_GAS_UNIT,
		nativeSymbol: PUBLIC_NATIVE_SYMBOL
	};
};
