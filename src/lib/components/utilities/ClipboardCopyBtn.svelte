<script lang="ts">
	import CopyIcon from 'virtual:icons/hugeicons/copy-01';
	import CheckIcon from 'virtual:icons/hugeicons/checkmark-square-01';

	let className = '';
	export { className as class };
	export let value: string;
	export let wrapperClass = '';

	let isCopied = false;
	const copy = () => {
		navigator.clipboard.writeText(value);
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 1000);
	};
</script>

<div class="clipboard-copy-btn flex items-center gap-2 {wrapperClass}">
	<slot />
	{#if value?.length}
		<button
			class="btn btn-circle bg-base-100 btn-sm hover:bg-base-200 {className}"
			data-tip={'Copied!'}
			on:click|preventDefault={copy}
		>
			{#if isCopied}
				<CheckIcon />
			{:else}
				<CopyIcon />
			{/if}
		</button>
	{/if}
</div>
