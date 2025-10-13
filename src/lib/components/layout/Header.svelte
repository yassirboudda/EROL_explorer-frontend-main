<script lang="ts">
	import Searchbar from '$lib/components/layout/Searchbar.svelte';
</script>

<div class="sticky top-0 z-40 navbar h-[4rem] bg-base-200">
	<div class="container mx-auto flex items-center gap-2">
		<a href="/" class="flex items-center gap-4 rounded-xl p-2 pr-4 pl-3 hover:bg-base-300">
			<img src="/MartianScanLogo.png" alt="MartianScan logo" height="42" width="42" />
			<div class="flex flex-col leading-tight">
				<span class="text-lg font-semibold">MartianScan</span>
				<span class="text-xs text-base-content/70">Martian Chain Explorer</span>
			</div>
		</a>
		<Searchbar class="ml-auto min-w-1/3" />
	</div>
</div>
