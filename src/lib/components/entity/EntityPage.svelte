<script lang="ts">
	import type { Component } from 'svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import EntityPageItem from '$lib/components/entity/EntityPageItem.svelte';
	import HomeIcon from 'virtual:icons/hugeicons/home-07';
	type EntityPageChild = {
		label?: string;
		value?: string | number;
		href?: string;
		class?: string;
		copy?: boolean;
		valueClass?: string;
		icon?: Component | null | undefined | any;
		component?: Component | null | undefined | any;
		props?: Record<string, unknown>;
		items?: EntityPageChild[];
	};

	type EntityPageSection = {
		title?: string;
		icon?: Component | null | undefined;
		items?: EntityPageChild[];
	};

	export let items: EntityPageSection[] = [];
	export let entityName: string;
	export let entityId: string | null = null;
	export let entityIcon: Component | null = null;
	export let entityIdMin: string | null = null;
	export let breadcrumbParentItem: any = {};
	export let isLoading = false;

	$: breadcrumb = [
		{ type: 'a', icon: HomeIcon, href: '/' },
		...(breadcrumbParentItem ? [breadcrumbParentItem] : []),
		{
			title: `${entityName ?? ''} ${entityIdMin ?? entityId ?? 'not found'}`,
			class: 'flex-1',
			icon: entityIcon
		}
	];
</script>

<svelte:head>
	<title>{entityName} {entityId ?? 'not found'}</title>
</svelte:head>

<div class="page-content">
	<Breadcrumb items={breadcrumb} />
	<div class="content">
		{#each items as section}
			{#if section?.items?.length}
				<div class="section">
					{#if section.title}
						<div class="title">
							{#if section.icon}
								<svelte:component this={section.icon} />
							{/if}
							<span>{section.title}</span>
						</div>
					{/if}
					{#if section.items}
						{#each section.items as item}
							<EntityPageItem {item} />
						{/each}
					{/if}
				</div>
			{/if}
		{:else}
			<div class="content bg-base-100">
				<div class="m-auto flex flex-col items-center justify-center px-4 py-32">
					<span class="text-xl">{entityName} not found</span>
				</div>
			</div>
		{/each}
		<slot name="after-content" />
	</div>
</div>
