<script lang="ts">
	import ContractOperations from '$lib/components/entity/Contract/ContractOperations.svelte';

	export let isLoading = false;
	export let entity: any = {};
	export let latestBlock = 0;

	$: operations = entity?.abi?.filter(
		(item: any) =>
			(item.stateMutability === 'view' || item.stateMutability === 'pure') &&
			item.type === 'function'
	);
</script>

<ContractOperations {entity} {latestBlock} {operations} {isLoading} />
