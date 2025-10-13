<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import FirstVisitBanner from '$lib/components/layout/FirstVisitBanner.svelte';
	import PagePreloader from '$lib/components/PagePreloader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/MartianScanLogo.png" />
	<link rel="apple-touch-icon" href="/MartianScanLogo.png" />
	<meta name="theme-color" content="#ff154e" />
	<meta
		name="description"
		content="MartianScan is the official Martian Chain explorer—track $EROL blocks, transactions, smart contracts, and network analytics in real time."
	/>
	<meta property="og:site_name" content="MartianScan" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="MartianScan | Martian Chain Explorer" />
	<meta
		property="og:description"
		content="Monitor Martian Chain blocks, transactions, contracts, and on-chain stats with MartianScan."
	/>
	<meta property="og:image" content="/og_image.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="MartianScan | Martian Chain Explorer" />
	<meta
		name="twitter:description"
		content="Monitor Martian Chain blocks, transactions, contracts, and on-chain stats with MartianScan."
	/>
	<meta name="twitter:image" content="/og_image.png" />
	<meta
		name="keywords"
		content="MartianScan, Martian Chain Explorer, $EROL blockchain, Martian blockchain explorer, Martian smart contracts"
	/>
	<script async src="https://www.googletagmanager.com/gtag/js?id=AW-403783252"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'AW-403783252');
	</script>
	<script>
		!function (e, t, n, s, u, a) {
			e.twq || ((s = e.twq = function () {
				s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
			}),
			(s.version = '1.1'),
			(s.queue = []),
			(u = t.createElement(n)),
			(u.async = !0),
			(u.src = 'https://static.ads-twitter.com/uwt.js'),
			(a = t.getElementsByTagName(n)[0]),
			a.parentNode.insertBefore(u, a));
		}(window, document, 'script');
		twq('config', 'pdzkg');
	</script>
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
