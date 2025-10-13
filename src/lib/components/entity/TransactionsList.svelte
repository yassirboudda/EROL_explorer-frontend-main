<script lang="ts">
	import {isFullyIndexed} from "$lib/utils";
	import DataList from '$lib/components/data/DataList.svelte';
	import DataListItem_Transaction from '$lib/components/data/DataListItem_Transaction.svelte';
	import InfoIcon from 'virtual:icons/hugeicons/information-square'

	export let isLoading = false;
	export let transactions: any[] = [];
	export let highlightAddress: string = '';
	export let totalPages: number = 1;
	export let showPagination: boolean = true;

	let className = '';
	export { className as class };
</script>

{#if isLoading}
	<div class="h-42 w-full skeleton"></div>
{:else}
	{#if isFullyIndexed()}
		<div class="container flex items-center px-2 my-2">
			<InfoIcon class="text-xl min-w-10" />
			<span>This explorer is not fully indexed, which means the following transaction list may be outdated.</span>
		</div>
	{/if}
	<DataList
		class={className}
		items={transactions}
		getItemHref={(tx) => `/tx/${tx.hash}`}
		totalPages={showPagination ? totalPages : 1}
		{showPagination}
	>
		<svelte:fragment slot="item" let:item={tx} let:i>
			<DataListItem_Transaction {tx} {i} {highlightAddress} />
		</svelte:fragment>
	</DataList>
{/if}
