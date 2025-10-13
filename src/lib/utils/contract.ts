import { whatsabi } from '@shazow/whatsabi';
import { ethers } from 'ethers';

export const getContractData = async (address: string) => {
	try {
		return await fetch(`/api/contract/${address}`).then((res) => res.json());
	} catch {
		/**/
	}
	return undefined;
};

export const getContractAbi = async (address: string) => {
	const data = await getContractData(address);
	return data?.abi ?? undefined;
};

export const getContractInterface = async (address: string, abi?: whatsabi.abi.ABI) => {
	if (!abi) abi = await getContractAbi(address);
	if (abi) {
		return new ethers.Interface(abi);
	} else {
		return undefined;
	}
};

/**
 * Determine output type and value of abi fragment
 */
export const determineFragmentOutputType = (rawBytes: any) => {
	if (rawBytes === '0x') {
		console.error('[determineFragmentOutputType] Method does not exist or returns nothing');
		return null;
	}

	const commonTypes = [
		'string',
		'uint256',
		'uint8',
		'uint128',
		'bytes32',
		'address',
		'bool',
		'bytes'
	];

	for (const type of commonTypes) {
		try {
			const value = ethers.AbiCoder.defaultAbiCoder().decode([type], rawBytes);
			if (type === 'address') {
				return {
					type,
					value: ethers.getAddress(String(value))
				};
			}
			if (!value.length) throw new Error();
			return { type, value };
		} catch {
			/**/
		}
	}

	return { type: null, value: null };
};

/** Detect proxy contract **/
export const isContractProxy = (iface: ethers.Interface) => {
	const fragments = Array(iface?.fragments)[0];
	const isProxy = fragments.find((frag: any) => frag.name === 'implementation');
	return !!isProxy;
};
