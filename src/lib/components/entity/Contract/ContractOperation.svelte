<script lang="ts">
	import { ethers } from 'ethers';
	import { provider, wallet } from '$lib/stores';
	import Address from '$lib/components/entity/common/Address.svelte';

	export let operation: any;
	export let contract: ethers.Contract | null;
	export let latestBlock = 0;

	let result: any;
	let inputsValues: { [name: string]: any } = {
		blockTag: latestBlock
	};
	$: if (latestBlock) {
		inputsValues.blockTag = latestBlock;
	}
	let isReadonly = operation?.stateMutability === 'view' || operation?.stateMutability === 'pure';
	let error: string | null = null;
	let isLoading = false;

	import type { JsonRpcProvider, JsonRpcSigner } from 'ethers';

	const call = async () => {
		isLoading = true;
		error = null;
		result = null;
		if (contract) {
			let providerOrSigner: JsonRpcProvider | JsonRpcSigner = $provider;

			try {
				if (!isReadonly) {
					const Wallet = await wallet.connect();
					if (Wallet.signer) {
						providerOrSigner = Wallet.signer;
					}
				}

				let { blockTag, ...inputs } = inputsValues;
				blockTag = blockTag ? Number(blockTag) : 'latest';

				const Contract: any = contract.connect(providerOrSigner);
				const method: any = Contract[operation.name];

				if (method) {
					const tx = await method(...Object.values(inputs), { blockTag });
					if (isReadonly) {
						result = tx;
					}
					if (!isReadonly) {
						// @TODO Decode output
					}
				} else {
					throw new Error(`Method ${operation.name} not found on contract`);
				}
			} catch (e: any) {
				error = (e.code ?? '') + ' ' + (e.shortMessage ?? e.message ?? '');
				isLoading = false;
			}
		} else {
			console.error('Contract is not defined');
		}
		isLoading = false;
	};
</script>

<div class="flex flex-col gap-2">
	<div class="join flex w-full gap-8">
		<span class="join-item input-prefix pl-2">Block number</span>
		<label class="input join-item w-full">
			<input type="text" class="grow" bind:value={inputsValues.blockTag} disabled={isLoading} />
		</label>
	</div>
	{#each operation.inputs as input}
		<div class="join flex w-full gap-8">
			<div class="join-item input-prefix pl-2">
				<span>{input.name}</span>
				{#if input.type}
					<span>&nbsp;({input.type})</span>
				{/if}
			</div>
			<label class="input join-item w-full">
				<input
					type="text"
					class="grow"
					bind:value={inputsValues[input.name]}
					disabled={isLoading}
				/>
			</label>
		</div>
	{/each}
	<button
		class="btn mx-2 mr-auto !rounded-lg px-16 btn-sm btn-primary"
		disabled={isLoading}
		on:click={call}
	>
		<span>{isReadonly ? 'Read' : 'Write'}</span>
		{#if isLoading}
			<span class="loading loading-sm loading-dots"></span>
		{/if}
	</button>

	{#if result !== null && !error}
		<!--{#if result}
			<div class="mx-2 text-lg">Result:</div>
		{/if}-->
		{#each operation.outputs as output, i}
			{#if isLoading}
				<div class="h-10 w-[420px] max-w-full skeleton"></div>
			{:else if result}
				<div class="join flex w-full gap-8">
					<span class="join-item input-prefix pl-2">Result</span>
					<div class="join-item w-full">
						{#if Array.isArray(result)}
							{#if String(result[i]).startsWith('0x')}
								<Address address={result[i]} />
							{:else}
								<textarea class="textarea min-h-6 w-full bg-base-200">{result[i]}</textarea>
							{/if}
						{:else if result}
							{#if output.type === 'address'}
								<Address address={result} />
							{:else}
								<textarea class="textarea min-h-6 w-full bg-base-200">{result}</textarea>
							{/if}
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	{/if}
	{#if error}
		<div class="alert alert-error">{error}</div>
	{/if}
</div>
