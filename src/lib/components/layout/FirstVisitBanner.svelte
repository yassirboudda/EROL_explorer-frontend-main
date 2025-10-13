<script lang="ts">
	import { onMount } from 'svelte';

	const STORAGE_KEY = 'erolscan:first-visit-dismissed';
	let visible = false;
	let timeoutId: NodeJS.Timeout | null = null;

	onMount(() => {
		if (typeof window === 'undefined') return;
		const hasVisited = window.localStorage.getItem(STORAGE_KEY);
		if (!hasVisited) {
			visible = true;
			timeoutId = setTimeout(() => dismiss(), 3000);
		}
	});

	function dismiss() {
		visible = false;
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(STORAGE_KEY, 'true');
		}
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	}
</script>

{#if visible}
	<div class="first-visit-banner">
		<div class="banner-content">
			<img src="/loading.gif" alt="Loading Martian Chain" />
			<div class="message">
				<h2>Welcome to <strong>ErolScan</strong></h2>
				<p>The Martian Chain explorer is spinning up.</p>
				<p class="hint">Fetching the latest $EROL blocks—hang tight!</p>
			</div>
			<button class="btn btn-outline" on:click={dismiss}>Enter explorer</button>
		</div>
	</div>
{/if}

<style lang="postcss">
	@reference "$lib/../app.css";
	.first-visit-banner {
		@apply fixed inset-0 z-50 flex items-center justify-center px-4;
		@apply bg-base-200/90 backdrop-blur;
	}

	.banner-content {
		@apply flex w-full max-w-2xl flex-col items-center gap-6 rounded-3xl bg-base-100/95 p-6 text-center shadow-xl sm:flex-row sm:text-left;
	}

	.message {
		@apply flex flex-col gap-2 text-base;
	}

	.hint {
		@apply text-sm text-base-content/70;
	}

	img {
		@apply h-32 w-32 min-w-[6rem] rounded-full object-contain sm:h-36 sm:w-36;
	}

	button {
		@apply w-full sm:w-auto;
	}

	@media (max-width: theme('screens.sm')) {
		.banner-content {
			@apply gap-4 p-5;
		}
	}
</style>
