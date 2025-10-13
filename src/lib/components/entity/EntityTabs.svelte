<script lang="ts">
	import { page } from '$app/state';
	import Tabs from '$lib/components/layout/Tabs.svelte';
	import TransactionsList from '$lib/components/entity/TransactionsList.svelte';
	import ContractSource from '$lib/components/entity/Contract/ContractSource.svelte';
	import ContractRead from '$lib/components/entity/Contract/ContractRead.svelte';
	import ContractWrite from '$lib/components/entity/Contract/ContractWrite.svelte';
	import TxIcon from 'virtual:icons/hugeicons/arrow-reload-horizontal';
	import CodeIcon from 'virtual:icons/hugeicons/source-code';
	import ReadIcon from 'virtual:icons/hugeicons/view';
	import WriteIcon from 'virtual:icons/hugeicons/edit-02';

	export let entity;
	export let latestBlock = 0;
	export let isContract = false;

	let isProxy = entity?.proxyResolution?.isProxy;

	$: tabs = [
		{ icon: TxIcon, label: `Transactions (${page?.data?.total ?? 0})` },
		...(isContract ? [{ icon: CodeIcon, label: 'Code' }] : []),
		...(isContract && entity?.abi
			? [
					{ icon: ReadIcon, label: 'Read' },
					{ icon: WriteIcon, label: 'Write' }
				]
			: []),
		...(isContract && isProxy
			? [
					{ icon: ReadIcon, label: 'Read as proxy' },
					{ icon: WriteIcon, label: 'Write as proxy' }
				]
			: [])
	];
</script>

<Tabs tabClass="text-lg" {tabs}>
	<svelte:fragment slot="content" let:tab>
		{#if tab === 0}
			<TransactionsList
				transactions={page?.data?.transactions}
				highlightAddress={page?.data?.address?.address}
				totalPages={page?.data?.totalPages}
				class="!p-0"
			/>
		{:else if tab === 1}
			<ContractSource {entity} />
		{:else if tab === 2}
			<ContractRead {entity} {latestBlock} />
		{:else if tab === 3}
			<ContractWrite {entity} {latestBlock} />
		{:else if tab === 4}
			<ContractRead entity={{ ...page.data.entity.proxies[0], address: entity.address }} {latestBlock} />
		{:else if tab === 5}
			<ContractWrite entity={{ ...page.data.entity.proxies[0], address: entity.address }} {latestBlock} />
		{/if}
	</svelte:fragment>
</Tabs>
