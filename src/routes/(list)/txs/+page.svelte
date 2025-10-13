<script lang="ts">
	import EntityList from '$lib/components/data/EntityList.svelte';
	import DataListItem_Transaction from '$lib/components/data/DataListItem_Transaction.svelte';

	export let data;
</script>

<EntityList
	title="Latest Transactions"
	breadcrumbTitle="Latest transactions"
	items={data.txs}
	totalPages={data.totalPages}
	getItemHref={(tx) => `/tx/${tx.hash}`}
>
	<svelte:fragment slot="item" let:item={tx} let:i>
		<DataListItem_Transaction {tx} {i} />
	</svelte:fragment>
</EntityList>
