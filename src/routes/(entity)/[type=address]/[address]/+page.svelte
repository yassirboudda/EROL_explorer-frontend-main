<script lang="ts">
	import { page } from '$app/state';
	import { formatAddress, firstLetterUpperCase } from '$lib/utils';
	import EntityPage from '$lib/components/entity/EntityPage.svelte';
	import EntityTabs from '$lib/components/entity/EntityTabs.svelte';
	import WalletIcon from 'virtual:icons/hugeicons/wallet-01';
	import ContractIcon from 'virtual:icons/hugeicons/document-code';

	export let data;

	let latestBlock = 0;

	$: items = [
		{
			items: [
				{ label: 'Address', value: data?.entity?.address ?? '', copy: true },
				{ label: 'Balance', value: `${data?.entity?.balance ?? 0} ${data.nativeSymbol}` },
				...(data?.entity?.proxyResolution?.isProxy ? [{ label: 'Proxy', value: 'true' }] : [])
			]
		}
	];
</script>

<EntityPage
	isLoading={false}
	entityName={data?.entity?.name?.length ? '' : firstLetterUpperCase(page?.params?.type ?? 'address')}
	entityId={data?.entity?.name ?? data?.entity?.address ?? page?.params?.address ?? ''}
	entityIdMin={data?.entity?.name ?? formatAddress(String(data?.entity?.address ?? page?.params?.address ?? ''), 8)}
	entityIcon={{
		address: WalletIcon,
		contract: ContractIcon
	}[page?.params?.type ?? 'address']}
	{items}
>
	<svelte:fragment slot="after-content">
		<EntityTabs entity={data.entity} isContract={data.kind === 'contract'} {latestBlock} />
	</svelte:fragment>
</EntityPage>
