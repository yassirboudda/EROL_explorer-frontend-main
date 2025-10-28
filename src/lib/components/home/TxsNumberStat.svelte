<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import TxIcon from 'virtual:icons/hugeicons/arrow-reload-horizontal';
	import numeral from 'numeral';
	import { _ } from 'svelte-i18n';

	let isLoading = true;
	let txsCount = 0;

	const updateTxCount = async () => {
		txsCount = await fetch('/api/tx-count').then((res) => res.json());
	};

	let it: NodeJS.Timeout | null = null;
	onMount(async () => {
		await updateTxCount();
		isLoading = false;
		it = setInterval(updateTxCount, 5000);
	});
	beforeNavigate(() => {
		if (it) {
			clearInterval(it);
			it = null;
		}
	});
</script>

<a href="/txs" class="stat">
	<TxIcon class="text-4xl" />
	<div class="flex flex-col">
		<div class="stat-title">Indexed Transactions</div>
		{#if isLoading}
			<div class="h-12 w-42 max-w-full skeleton"></div>
		{:else}
			<div class="stat-value">{txsCount ? numeral(txsCount).format('0,0') : '-'}</div>
		{/if}
	</div>
	<span class="btn ml-auto hover:bg-base-200">{$_('home.viewAll')}</span>
</a>
