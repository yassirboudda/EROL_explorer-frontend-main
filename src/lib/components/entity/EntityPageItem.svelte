<script lang="ts">
	import type { Component } from 'svelte';
	import ClipboardCopyBtn from '$lib/components/utilities/ClipboardCopyBtn.svelte';

	interface EntityPageItem {
		href?: string;
		class?: string;
		icon?: Component<any>;
		label?: string;
		value?: string;
		copy?: boolean;
		valueClass?: string;
		component?: Component<any>;
		props?: { [name: string]: any };
		items?: EntityPageItem[];
	}

	export let item: EntityPageItem | any = null;
</script>

{#snippet itemSnippet(item: EntityPageItem)}
	{#if item.icon || item.value}
		<div class="value {item.valueClass ?? ''}">
			{#if item.icon}
				<svelte:component this={item.icon} />
			{/if}
			{#if item.value === 'loading'}
				<div class="loading loading-sm loading-dots"></div>
			{:else}
				<span>{item.value}</span>
			{/if}
			{#if item.copy && item.value}
				<ClipboardCopyBtn value={item.value} />
			{/if}
		</div>
	{/if}
	{#if item.component}
		<svelte:component this={item.component} {...item.props} />
	{/if}
{/snippet}

{#if item}
	{#if item.component && !item.label}
		<svelte:component this={item.component} {...item.props} />
	{:else if item.value || item.items || item.component}
		<svelte:element
			this={item.href?.length ? 'a' : 'div'}
			href={item.href ?? null}
			class="row {item.class ?? ''}"
		>
			{#if item.label}
				<div class="label">{item.label}</div>
			{/if}
			{@render itemSnippet(item)}
			{#if item.items}
				{#each item.items as val}
					{@render itemSnippet(val)}
				{/each}
			{/if}
		</svelte:element>
	{/if}
{/if}
