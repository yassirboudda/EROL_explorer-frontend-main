<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import FirstVisitBanner from '$lib/components/layout/FirstVisitBanner.svelte';
	import PagePreloader from '$lib/components/PagePreloader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/ErolScanLogo.png" />
	<link rel="apple-touch-icon" href="/ErolScanLogo.png" />
	<meta name="theme-color" content="#ff154e" />
</svelte:head>

<div class="flex min-h-screen w-screen flex-col">
	<Header />
	<FirstVisitBanner />
	<div class="main-content-wrapper flex flex-1 flex-col gap-4 px-1 py-2 sm:py-4">
		{@render children?.()}
	</div>
	<Footer />
</div>

<PagePreloader />

<style lang="postcss">
	@reference "$lib/../app.css";
	.main-content-wrapper {
		min-height: calc(100vh - calc(var(--spacing) * 8));
	}
</style>
