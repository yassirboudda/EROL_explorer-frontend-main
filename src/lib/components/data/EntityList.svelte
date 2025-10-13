<script lang="ts">
	import DataList from '$lib/components/data/DataList.svelte';
	import HomeIcon from 'virtual:icons/hugeicons/home-07';

	export let title: string;
	export let items: any[] = [];
	export let totalPages: number = 1;
	export let getItemHref: (item: any) => string;
	export let breadcrumbTitle: string = title;

	let className = '';
	export { className as class };
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<DataList
	class={className}
	breadCrumbItems={[
		{ type: 'a', icon: HomeIcon, href: '/' },
		{ title: breadcrumbTitle, class: 'flex-1' }
	]}
	{items}
	{getItemHref}
	{totalPages}
>
	<svelte:fragment slot="item" let:item let:i>
		<slot name="item" {item} {i} />
	</svelte:fragment>
</DataList>
