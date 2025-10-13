<script lang="ts">
	import Pagination from '$lib/components/data/Pagination.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';

	let className = '';
	export { className as class };

	export let breadCrumbItems: any[] = [];
	export let items: any[] = [];
	export let getItemHref: (item: any) => string = (item: any) => `/tx/${item.hash}`;
	export let totalPages = 1;
	export let showPagination = true;
</script>

<div class="list {className}">
	<slot name="before-content" />
	{#if breadCrumbItems?.length}
		<Breadcrumb items={breadCrumbItems} />
	{/if}
	<div class="content">
		{#each items ?? [] as item, i}
			<div class="flex">
				<a href={getItemHref(item)} class="list-item lg:w-full">
					<slot name="item" {item} {i} />
				</a>
			</div>
		{:else}
			<div class="list-item py-16 empty">
				<div class="text-lg mx-auto">No item found</div>
			</div>
		{/each}
	</div>
</div>
{#if showPagination}
	<Pagination class="mx-auto" total={totalPages} />
{/if}
