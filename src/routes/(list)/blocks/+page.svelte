<script lang="ts">
	import EntityList from '$lib/components/data/EntityList.svelte';
	import DataListItem_Block from '$lib/components/data/DataListItem_Block.svelte';

	export let data;
</script>

<EntityList
	title="Latest Blocks"
	breadcrumbTitle="Latest blocks"
	items={data.blocks}
	totalPages={data.totalPages}
	getItemHref={(block) => `/block/${block.number}`}
>
	<svelte:fragment slot="item" let:item={block}>
		<DataListItem_Block {block} />
	</svelte:fragment>
</EntityList>
