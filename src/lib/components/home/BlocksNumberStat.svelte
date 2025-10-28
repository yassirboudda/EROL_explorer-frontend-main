<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { ethers } from 'ethers';
	import { page } from '$app/state';
	import numeral from 'numeral';
	import BlockIcon from 'virtual:icons/hugeicons/blockchain-01';
	import { _ } from 'svelte-i18n';

	let isLoading = true;
	let latestBlockNumber = 0;

	const updateBlockNumber = async () => {
		const provider = new ethers.JsonRpcProvider(page.data.rpcUrl);
		latestBlockNumber = (await provider.getBlock('latest'))?.number ?? 0;
	};

	let it: NodeJS.Timeout;
	onMount(async () => {
		await updateBlockNumber();
		isLoading = false;
		it = setInterval(updateBlockNumber, 5000);
	});
	beforeNavigate(() => clearInterval(it));
</script>

<a href="/blocks" class="stat">
	<BlockIcon class="text-4xl" />
	<div class="flex flex-col">
		<div class="stat-title">Total blocks</div>
		{#if isLoading}
			<div class="h-12 w-42 max-w-full skeleton"></div>
		{:else}
			<div class="stat-value">
				{latestBlockNumber ? numeral(latestBlockNumber).format('0,0') : '-'}
			</div>
		{/if}
	</div>
	<span class="btn ml-auto hover:bg-base-200">{$_('home.viewAll')}</span>
</a>
