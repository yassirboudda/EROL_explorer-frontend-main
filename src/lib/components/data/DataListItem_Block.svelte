<script lang="ts">
	import moment from 'moment';
	import { formatAddress } from '$lib/utils';
	import ClipboardCopyBtn from '$lib/components/utilities/ClipboardCopyBtn.svelte';

	import BlockIcon from 'virtual:icons/hugeicons/blockchain-01';
	import GasIcon from 'virtual:icons/hugeicons/fuel-station';
	import DateTimeIcon from 'virtual:icons/hugeicons/date-time';
	import RightArrowIcon from 'virtual:icons/hugeicons/arrow-right-02';

	export let block;
</script>

{#if block}
	<div class="badge">
		<BlockIcon />
		<span class="mx-auto">#{block.number}</span>
	</div>
	<div class="badge">
		<DateTimeIcon />
		<span>{moment(new Date(block.timestamp * 1000)).fromNow()}</span>
	</div>
	<ClipboardCopyBtn value={block.hash} wrapperClass="hidden sm:flex">
		<span class="mx-auto hidden xl:block">{block.hash}</span>
		<span class="min-w-52 xl:hidden">{formatAddress(block.hash, 8)}</span>
	</ClipboardCopyBtn>
	<span class="mr-auto"></span>
	<div class="badge">
		<span>{block.transactions?.length ?? 0}</span>
		<span>{block.transactions?.length > 1 ? 'Txs' : 'Tx'}</span>
	</div>
	<div class="badge">
		<GasIcon />
		<span class="text-sm">Gas used</span>
		<span class="min-w-12 text-center"
			>{Math.round((block.gasUsed / block.gasLimit) * 100 * 100) / 100}%</span
		>
	</div>
	<div class="icon !p-1">
		<RightArrowIcon class="text-xl" />
	</div>
{/if}
