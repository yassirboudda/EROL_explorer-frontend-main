<script lang="ts">
	export let value: number | null = null;
</script>

{#if value}
	<div class="relative badge gap-4 bg-base-200 badge-lg">
		<div
			class="radial-background radial-progress absolute left-3 translate-y-1/6 -rotate-90 text-base-300"
			style="--value:50;--size:2rem;--thickness:8px;"
			aria-valuenow="100"
			role="progressbar"
		></div>
		<div
			class="radial-progress translate-y-1/6 -rotate-90"
			style="--value:{value / 2};--size:1.75rem;--thickness:4px;"
			aria-valuenow={value / 2}
			role="progressbar"
		></div>
		<span class="font-medium">{value}%</span>
	</div>
{/if}
