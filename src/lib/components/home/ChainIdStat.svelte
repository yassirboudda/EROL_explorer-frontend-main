<script lang="ts">
	import { ethers } from 'ethers';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import LinkIcon from 'virtual:icons/hugeicons/link-04';
	import { _ } from 'svelte-i18n';

	let isLoading = true;
	let chainId = 0;
	onMount(async () => {
		const provider = new ethers.JsonRpcProvider(page.data.rpcUrl);
		chainId = Number((await provider.getNetwork()).chainId) ?? 0;
		isLoading = false;
	});

	let copyLabel = $_('home.copy');
	const copy = () => {
		navigator.clipboard.writeText(chainId.toString());
		copyLabel = $_('home.copied');
		setTimeout(() => {
			copyLabel = $_('home.copy');
		}, 1000);
	};
</script>

<div class="stat">
	<LinkIcon class="text-4xl" />
	<div class="flex flex-col">
		<div class="stat-title">{$_('home.chainId')}</div>
		<div class="stat-value">
			{#if isLoading}
				<div class="h-12 w-42 max-w-full skeleton"></div>
			{:else}
				<span>{chainId ?? '-'}</span>
			{/if}
		</div>
	</div>
	{#if !isLoading}
		<button class="btn ml-auto" on:click={copy}>{copyLabel}</button>
	{/if}
</div>
