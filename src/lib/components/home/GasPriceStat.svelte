<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { ethers } from 'ethers';
	import GasIcon from 'virtual:icons/hugeicons/fuel-station';
	import { _ } from 'svelte-i18n';

	let isLoading = true;
	let gasPrice = 0;

	const updateGasPrice = async () => {
		const provider = new ethers.JsonRpcProvider(page.data.rpcUrl);
		const rawGasPrice = Number((await provider.getFeeData()).gasPrice ?? 0);
		gasPrice = rawGasPrice ? Math.round(rawGasPrice * 10 ** -9 * 1000) / 1000 : 0;
	};

	let it: NodeJS.Timeout | null = null;
	onMount(async () => {
		await updateGasPrice();
		isLoading = false;
		it = setInterval(updateGasPrice, 5000);
	});
	beforeNavigate(() => {
		if (it) {
			clearInterval(it);
			it = null;
		}
	});
</script>

<div class="stat">
	<GasIcon class="text-4xl" />
	<div class="flex flex-col">
		<div class="stat-title">{$_('home.gasPrice')}</div>
		<div class="stat-value">
			{#if isLoading}
				<div class="h-12 w-42 max-w-full skeleton"></div>
			{:else}
				<span>{gasPrice ?? '-'}</span>
				<span>{page.data.gasUnit ?? 'Gwei'}</span>
			{/if}
		</div>
	</div>
</div>
