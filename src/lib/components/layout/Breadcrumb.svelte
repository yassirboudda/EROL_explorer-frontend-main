<script lang="ts">
	export let items: { [key: string]: any }[] = [];
</script>

<div class="breadcrumb">
	{#each items as item}
		{#if item?.title || item?.icon}
			<svelte:element this={item.type ?? 'div'} {...{ ...item, class: 'item ' + item.class }}>
				{#if item.icon}
					<svelte:component this={item.icon} class="text-xl" />
				{/if}
				{#if item.title}
					<div>{item.title}</div>
				{/if}
				{#if item.value}
					<span>{item.value}</span>
				{/if}
			</svelte:element>
		{/if}
	{/each}
</div>

<style lang="postcss">
	@reference "$lib/../app.css";
	.breadcrumb {
		@apply flex w-full flex-wrap gap-2;
		.item {
			@apply flex flex-wrap items-center gap-2 rounded-xl bg-base-100 p-2 px-4;

			&:is(a, button):hover {
				@apply cursor-pointer bg-base-300;
			}

			&:not(:first-child) {
				@apply text-lg sm:text-xl;
			}
		}
	}
</style>
