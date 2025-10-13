<script lang="ts">
	import type { Component } from 'svelte';
	import { page } from '$app/state';

	export let tabs: {
		label: string;
		icon?: Component;
		hash?: string;
	}[] = [];
	export let tabClass = '';

	let pageHash = page.url.hash;

	let activeTab = 0;
	$: activeTab = tabs.findIndex((t) => {
		return t.label.toLowerCase().replaceAll(' ', '-') === pageHash.toLowerCase().replace('#', '');
	});
</script>

<div class="flex w-full gap-2 overflow-auto">
	{#each tabs as tab, i}
		{#if tab}
			{#if tab.label === 'loading'}
				<div class="flex items-center rounded-xl bg-base-100 px-8">
					<div class="loading loading-xs loading-dots"></div>
				</div>
			{:else}
				<a
					href={i === 0
						? page.url.pathname
						: `#${tab?.hash ?? tab?.label?.toLowerCase()?.replaceAll(' ', '-')}`}
					class="flex cursor-pointer items-center gap-3 rounded-xl bg-base-100 p-2 px-4 whitespace-nowrap hover:bg-base-300 {tabClass}"
					class:bg-base-300={Math.max(0, activeTab) === i}
					on:click={() => (activeTab = i)}
				>
					{#if tab.icon}
						<svelte:component this={tab.icon} />
					{/if}
					<span>{tab.label}</span>
				</a>
			{/if}
		{/if}
	{/each}
	<div class="flex-1 rounded-xl bg-base-100"></div>
</div>

<slot name="content" tab={Math.max(0, activeTab)} />
