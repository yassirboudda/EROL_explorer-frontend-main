import type { RequestHandler } from './$types';
// import {PUBLIC_RPC_URL} from "$env/static/public";
// import {SOURCIFY_API_URL} from "$env/static/private";
// import { json } from '@sveltejs/kit';
// import {ethers} from "ethers";
// import {ETHERSCAN_API_KEY} from "$env/static/private";
import api from '$lib/server/api';

export const GET: RequestHandler = async ({ params }) => {
	// const provider = new ethers.JsonRpcProvider(PUBLIC_RPC_URL);
	// const network = await provider.getNetwork();
	// const chainId = Number(network.chainId);

	return api.resolveEntity(params.address);

	/*try {
		const fetchSourcifyData = async () => {
			return await fetch(
				`${SOURCIFY_API_URL}/v2/contract/${chainId}/${params.address}?fields=all`
			).then(res => res.json())
		}
		const response = await fetchSourcifyData();

		// Etherscan fallback
		if(!response.match) {
			await fetch(
				`${SOURCIFY_API_URL}/v2/verify/etherscan/${chainId}/${params.address}`,
				{
					method: 'POST',
					body: JSON.stringify({
						"apiKey": ETHERSCAN_API_KEY
					}),
					headers: { "content-type": "application/json" },
				}
			).then(res => res.json())
		}

		return json(response)
	} catch (e) {
		console.error('[sourcify error]', e)
		return json({})
	}*/
};
