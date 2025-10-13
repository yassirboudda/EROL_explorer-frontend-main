<script lang="ts">
	import ChevronDownIcon from 'virtual:icons/hugeicons/arrow-down-01';
	import ContractOperation from '$lib/components/entity/Contract/ContractOperation.svelte';
	import { ethers } from 'ethers';
	import { provider } from '$lib/stores';
	import ClipboardCopyBtn from '$lib/components/utilities/ClipboardCopyBtn.svelte';

	export let isLoading = true;
	export let entity: any;
	export let operations: any[] = [];
	export let latestBlock = 0;

	$: contract =
		Object.entries(entity).length && entity.address
			? new ethers.Contract(entity.address, entity.abi, $provider)
			: null;

	let collapsed: { [collapse: string]: boolean } = {};
</script>

{#if isLoading}
	<div class="h-72 w-full skeleton rounded-2xl p-2"></div>
{:else if operations.length && entity}
	<div class="section list !bg-transparent !p-0">
		{#each operations as operation, i}
			{#if operation && operation.type !== 'constructor'}
				<div class="collapse rounded-xl bg-base-100" class:collapse-open={collapsed[i]}>
					<button
						class="collapse-title flex w-full items-center gap-2 !p-0 !pr-2 transition-all"
						on:click={(e) => {
							const target = e.target as HTMLElement | null;
							if (target?.closest('.clipboard-copy-btn')) {
								return;
							}
							collapsed[i] = !collapsed[i];
						}}
					>
						<span class="badge !h-auto min-h-10 border-0 bg-base-100 badge-lg pl-4">
							<span class="pointer-events-none">{operation.name ?? 'Unknown name'}</span>
							<ClipboardCopyBtn value={operation.name} class="hover:!bg-base-300" />
						</span>
						<div class="ml-auto"></div>
						<ChevronDownIcon
							class="pointer-events-none text-2xl transition-all {collapsed[i] ? 'rotate-180' : ''}"
						/>
					</button>
					<div
						class="collapse-content overflow-hidden rounded-lg bg-base-100 px-2 !pt-0"
						class:!py-2={collapsed[i]}
					>
						<ContractOperation {operation} {contract} {latestBlock} />
					</div>
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<div class="empty list-item bg-base-100 py-16">
		<div class="mx-auto text-lg">No item found</div>
	</div>
{/if}

<style lang="postcss">
	@reference "$lib/../app.css";
	.collapse.collapse-open {
		@apply bg-base-100;
	}
</style>
