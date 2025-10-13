<script lang="ts">
	import numeral from 'numeral';
	import EntityPage from '$lib/components/entity/EntityPage.svelte';
	import Timestamp from '$lib/components/entity/common/Timestamp.svelte';
	import PercentGasUsed from '$lib/components/entity/common/PercentGasUsed.svelte';
	import TransactionsList from '$lib/components/entity/TransactionsList.svelte';
	import Tabs from '$lib/components/layout/Tabs.svelte';
	import BlockIcon from 'virtual:icons/hugeicons/blockchain-01';
	import GasIcon from 'virtual:icons/hugeicons/fuel-station';
	import TxIcon from 'virtual:icons/hugeicons/arrow-reload-horizontal';

	export let data;

	$: percentGasUsed =
		Math.round(((data?.block?.gasUsed ?? 0) / (data?.block?.gasLimit ?? 0)) * 100 * 100) / 100;
</script>

<EntityPage
	entityName="Block"
	entityId={data?.block?.number}
	entityIcon={BlockIcon}
	items={typeof data?.block?.number !== 'undefined'
		? [
				{
					items: [
						{
							label: 'Block Number',
							value: String(data?.block?.number ?? '-'),
							copy: !!data?.block?.number
						},
						{ label: 'Hash', value: data?.block?.hash ?? '-', copy: !!data?.block?.hash },
						{
							label: 'Parent Hash',
							value: data?.block?.parentHash ?? '-',
							copy: !!data?.block?.parentHash
						},
						{ component: Timestamp, props: { timestamp: data?.block?.timestamp } }
					]
				},
				{
					items: [
						{
							label: 'Gas used',
							icon: GasIcon,
							value: numeral(data?.block?.gasUsed).format('0,0'),
							component: PercentGasUsed,
							props: { value: percentGasUsed }
						},
						{ label: 'Gas limit', value: numeral(data.block?.gasLimit).format('0,0') }
					]
				}
			]
		: []}
>
	<svelte:fragment slot="after-content">
		{#if data?.block?.number}
			<Tabs
				tabClass="text-lg"
				tabs={[{ icon: TxIcon, label: `Transactions (${data?.transactions?.length ?? 0})` }]}
			/>
			<TransactionsList
				transactions={data.transactions.map((tx: string | { hash: string }) =>
					typeof tx === 'string' ? { hash: tx } : tx
				)}
				showPagination={false}
				class="!p-0"
			/>
		{/if}
	</svelte:fragment>
</EntityPage>
