<script lang="ts">
	import { formatAddress, formatNumber, getTransactionMethod } from '$lib/utils';
	import EntityPage from '$lib/components/entity/EntityPage.svelte';
	import Timestamp from '$lib/components/entity/common/Timestamp.svelte';
	import Address from '$lib/components/entity/common/Address.svelte';
	import TxLogs from '$lib/components/entity/Transaction/TxLogs.svelte';
	import TxData from '$lib/components/entity/Transaction/TxData.svelte';
	import BlockIcon from 'virtual:icons/hugeicons/blockchain-01';
	import TxIcon from 'virtual:icons/hugeicons/arrow-reload-horizontal';

	export let data;

	const txFee = (Number(data?.tx?.gasUsed ?? 0) * (data?.tx?.gasPrice ?? 0)) / 10 ** 18;
</script>

<EntityPage
	breadcrumbParentItem={data?.tx?.blockNumber
		? {
				type: 'a',
				icon: BlockIcon,
				title: `${data?.tx?.blockNumber}`,
				href: `/block/${data?.tx?.blockNumber ?? ''}`,
				class: 'flex-auto sm:flex-none'
			}
		: null}
	entityName="Transaction"
	entityId={data?.tx?.hash}
	entityIdMin={formatAddress(data?.tx?.hash, 8)}
	entityIcon={TxIcon}
	items={Object.keys(data?.tx ?? {}).length
		? [
				{
					items: [
						{ label: 'Hash', value: data?.tx?.hash, copy: true },
						{
							label: 'Status',
							value: [data?.tx?.error ?? 'Error', 'Success'][data?.tx?.status],
							valueClass: [
								'!bg-error !text-white badge-error',
								'!bg-success !text-black badge-success'
							][data?.tx?.status]
						},
						{
							label: 'Value',
							value: `${formatNumber(data.tx.value / 10 ** 18)} ${data.nativeSymbol}`
						},
						{
							label: 'Block #',
							href: `/block/${data.tx.blockNumber}`,
							icon: BlockIcon,
							value: String(data.tx.blockNumber),
							valueClass: 'hover:!bg-base-300',
							copy: true
						},
						{ component: Timestamp, props: { timestamp: data?.tx?.timestamp } }
					]
				},
				{
					items: [
						{ label: 'From', component: Address, props: { address: data?.tx?.from } },
						{
							label: 'To',
							component: Address,
							props: { address: data?.tx?.to }
						}
					]
				},
				{
					items: [
						{ label: 'Nonce', value: String(data?.tx?.nonce), copy: true },
						{
							label: 'Tx Fee',
							value: `${formatNumber(txFee)} ${data.nativeSymbol}`
						},
						{
							label: 'Gas price',
							value: `${formatNumber(data.tx.gasPrice / 10 ** 18)} ${data.nativeSymbol}`
						}
					]
				},
				...(data?.tx?.data !== '0x'
					? [
							{
								items: [
									{
										label: 'Tx Method',
										items: [
											{
												value: getTransactionMethod(data?.tx),
												copy: true
											},
											{
												value: data?.tx?.data?.slice(0, 10),
												copy: true
											}
										]
									},
									{ component: TxData, props: { tx: data.tx } },
									{ component: TxLogs, props: { logs: data?.tx?.logs ?? [] } }
								]
							}
						]
					: [])
			]
		: []}
/>
