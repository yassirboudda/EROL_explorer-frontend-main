import { type Writable, writable, get } from 'svelte/store';
import { ethers, type BrowserProvider, type JsonRpcSigner } from 'ethers';
import { PUBLIC_RPC_URL } from '$env/static/public';

export const provider: Writable<ethers.JsonRpcProvider> = writable(
	new ethers.JsonRpcProvider(PUBLIC_RPC_URL)
);

export const wallet = (() => {
	const { subscribe, set } = writable<{
		address: string | null;
		signer: JsonRpcSigner | null;
		isConnected: boolean;
		chainId: number | null;
	}>({
		address: null,
		signer: null,
		isConnected: false,
		chainId: null
	});

	async function connect() {
		try {
			if (!window.ethereum) {
				throw new Error('Please install MetaMask!');
			}

			// Request account access
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const address = accounts[0];

			// Get the provider and signer
			const browserProvider = new ethers.BrowserProvider(window.ethereum);
			const signer = await browserProvider.getSigner();

			// Get chain ID
			const network = await browserProvider.getNetwork();

			// Update store
			set({
				address,
				signer,
				isConnected: true,
				chainId: Number(network.chainId)
			});

			// Set up listeners
			window.ethereum.on('accountsChanged', handleAccountsChanged);
			window.ethereum.on('chainChanged', handleChainChanged);

			return { address, signer };
		} catch (error) {
			console.error('Failed to connect wallet:', error);
			throw error;
		}
	}

	function disconnect() {
		if (window.ethereum) {
			window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
			window.ethereum.removeListener('chainChanged', handleChainChanged);
		}

		set({
			address: null,
			signer: null,
			isConnected: false,
			chainId: null
		});
	}

	async function handleAccountsChanged(accounts: string[]) {
		const currentState = get({ subscribe });

		if (accounts.length === 0) {
			// MetaMask is locked or the user has not connected any accounts
			disconnect();
		} else if (accounts[0] !== currentState.address) {
			// Account changed
			const browserProvider = new ethers.BrowserProvider(window.ethereum);
			const signer = await browserProvider.getSigner();

			set({
				...currentState,
				address: accounts[0],
				signer
			});
		}
	}

	async function handleChainChanged(chainId: string) {
		// Reload the page when the chain changes
		window.location.reload();
	}

	// Initialize connection if already connected
	async function init() {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({ method: 'eth_accounts' });
				if (accounts.length > 0) {
					await connect();
				}
			} catch (error) {
				console.error('Failed to initialize wallet connection:', error);
			}
		}
	}

	// Initialize on module load
	if (typeof window !== 'undefined') {
		init();
	}

	return {
		subscribe,
		connect,
		disconnect
	};
})();

declare global {
	interface Window {
		ethereum?: any;
	}
}
