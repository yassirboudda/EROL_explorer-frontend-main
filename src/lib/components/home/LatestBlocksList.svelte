<script lang="ts">
	import moment from 'moment';
	import BlockIcon from 'virtual:icons/hugeicons/blockchain-01';

	export let latestBlocks: any[] = [];
</script>

<div class="home-list">
	{#each latestBlocks as block}
		<a href="/block/{block.number}" class="list-item">
			<div class="icon">
				<BlockIcon class="text-2xl" />
			</div>
			<div class="text-lg">#{block.number}</div>
			<span class="ml-auto"></span>
			<div class="badge badge-lg">
				<span>{block.transactions?.length ?? 0}</span>
				<span class="hidden sm:block"
					>{block.transactions?.length > 1 ? 'Transactions' : 'Transaction'}</span
				>
				<span class="sm:hidden">{block.transactions?.length > 1 ? 'Txs' : 'Tx'}</span>
			</div>
			<div class="badge badge-lg">
				{moment(new Date(block.timestamp * 1000)).fromNow()}
			</div>
		</a>
	{:else}
		<div class="list-item py-16 hover:bg-base-100">
			<div class="text-lg mx-auto">No item found</div>
		</div>
	{/each}
</div>
