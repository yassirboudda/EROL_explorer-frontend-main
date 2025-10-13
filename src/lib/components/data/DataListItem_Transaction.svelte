<script lang="ts">
	import moment from 'moment';
	import {page} from "$app/state";
	import { formatAddress, formatNumber, getTransactionMethod } from '$lib/utils';
	import ClipboardCopyBtn from '$lib/components/utilities/ClipboardCopyBtn.svelte';

	import RightArrowIcon from 'virtual:icons/hugeicons/arrow-right-02';
	import BlockIcon from 'virtual:icons/hugeicons/blockchain-01';
	import TxIcon from 'virtual:icons/hugeicons/arrow-reload-horizontal';
	import DateTimeIcon from 'virtual:icons/hugeicons/date-time';

	export let tx;
	export let i = 0;
	export let highlightAddress = '';

	$: txMethod = getTransactionMethod(tx);
</script>

{#if tx}
	<div class="badge min-w-full gap-4 sm:min-w-auto">
		<TxIcon />
		<ClipboardCopyBtn value={tx.hash} wrapperClass="!px-0 !py-0.5 w-full sm:w-auto">
			<span class="min-w-42">{formatAddress(tx.hash, 8)}</span>
		</ClipboardCopyBtn>
	</div>
	<div
		class="badge w-24 sm:max-w-24 sm:min-w-24 {txMethod !== '-' ? 'tooltip' : ''} {i < 1
			? 'tooltip-bottom'
			: ''}"
		role="tooltip"
		data-tip={txMethod}
	>
		<span class="overflow-hidden text-ellipsis whitespace-nowrap">{txMethod ?? '-'}</span>
	</div>
	{#if tx.timestamp}
		<div class="value">
			<DateTimeIcon />
			<span>{moment(new Date(tx.timestamp * 1000)).fromNow()}</span>
		</div>
	{/if}
	{#if tx.blockNumber}
		<button class="value">
			<BlockIcon />
			<span>Block</span>
			<span>#{tx.blockNumber}</span>
		</button>
	{/if}
	<div class="mr-auto ml-8 flex items-center gap-8">
		{#if tx.from?.length}
			<ClipboardCopyBtn value={tx.from}>
				<span class:text-blue-500={highlightAddress === tx.from}>{formatAddress(tx.from, 8)}</span>
			</ClipboardCopyBtn>
		{/if}
		{#if tx.to?.length}
			<RightArrowIcon />
			<ClipboardCopyBtn value={tx.to}>
				<span class:text-blue-500={highlightAddress === tx.to}>{formatAddress(tx.to, 8)}</span>
			</ClipboardCopyBtn>
		{/if}
	</div>
	{#if typeof tx.value !== 'undefined'}
		<div class="badge">
			<span>{formatNumber(tx.value / 10 ** 18)}</span>
			<span>{page.data.nativeSymbol ?? 'ETH'}</span>
		</div>
	{/if}
	<div class="icon !p-1">
		<RightArrowIcon class="text-xl" />
	</div>
{/if}

<style lang="postcss">
	@reference "$lib/../app.css";
	.value {
		@apply flex items-center gap-2;
	}
</style>
