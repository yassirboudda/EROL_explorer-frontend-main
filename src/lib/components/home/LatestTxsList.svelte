<script lang="ts">
	import { page } from '$app/state';
	import moment from 'moment';
	import { formatAddress, formatNumber } from '$lib/utils';
	import TxIcon from 'virtual:icons/hugeicons/arrow-reload-horizontal';

	export let latestTxs: any[] = [];
</script>

<div class="home-list">
	{#each latestTxs as tx}
		<a href="/tx/{tx.hash}" class="list-item">
			<div class="icon">
				<TxIcon class="text-2xl" />
			</div>
			<div class="text-lg">{formatAddress(tx.hash, 6)}</div>
			<span class="ml-auto"></span>
			<!--{#if getTransactionMethod(tx)?.length}
				<span class="badge w-24 sm:max-w-24 sm:min-w-24"
					>{getTransactionMethod(tx)}</span
				>
			{/if}-->
			<div class="badge">
				<span class="max-w-16 overflow-hidden text-ellipsis"
					>{formatNumber(tx.value / 10 ** 18)}</span
				>
				<span>{page.data.nativeSymbol}</span>
			</div>
			<div class="badge sm:mr-4">{moment(new Date(tx.timestamp * 1000)).fromNow()}</div>
		</a>
	{:else}
		<div class="list-item py-16 hover:bg-base-100">
			<div class="text-lg mx-auto">No item found</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	@reference "$lib/../app.css";
</style>
