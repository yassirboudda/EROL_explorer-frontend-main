<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { ClickOutside } from '$lib/directives/ClickOutside';
	import FirstIcon from 'virtual:icons/hugeicons/arrow-left-double';
	import PrevIcon from 'virtual:icons/hugeicons/arrow-left-01';
	import NextIcon from 'virtual:icons/hugeicons/arrow-right-01';
	import LastIcon from 'virtual:icons/hugeicons/arrow-right-double';

	let className = '';
	export { className as class };

	export let total = 10;

	let isDomLoaded = false;
	let isSettingsOpen = false;
	let current = 1;

	const updateCurrentPage = () => {
		isDomLoaded = true;
		const p = new URL(window.location.href).searchParams.get('p');
		current = Math.max(1, Math.min(total, Number(p)));
	};
	afterNavigate(updateCurrentPage);
	onMount(updateCurrentPage);

	const getUrl = (relative = 0, absolute = 0) => {
		let p = current;
		if (relative) {
			p = Math.max(1, Math.min(total, current + relative));
		} else if (absolute) {
			p = absolute;
		}
		if (p === 1) {
			page.url.searchParams.delete('p');
		} else {
			page.url.searchParams.set('p', p.toString());
		}
		page.url.hash = '';
		return page.url.href;
	};
	let firstUrl = page.url.href;
	$: if (current) firstUrl = getUrl(0, 1);
	let prevUrl = page.url.href;
	$: if (current) prevUrl = getUrl(-1);
	let nextUrl = page.url.href;
	$: if (current) nextUrl = getUrl(+1);
	let lastUrl = page.url.href;
	$: if (current) lastUrl = getUrl(0, total);
</script>

<div class="pagination {className}">
	<a href={firstUrl} class="badge" class:disabled={!isDomLoaded || current <= 1}>
		<FirstIcon />
	</a>
	<a href={prevUrl} class="badge" class:disabled={!isDomLoaded || current <= 1}>
		<PrevIcon />
	</a>
	<button
		class="badge cursor-pointer gap-1"
		on:click|preventDefault={() => (isSettingsOpen = !isSettingsOpen)}
		use:ClickOutside={'.pagination-settings'}
		on:clickOutside={() => (isSettingsOpen = false)}
	>
		<span>{!isDomLoaded ? '-' : current}</span>
		<span>/</span>
		<span>{total}</span>
	</button>
	<a href={nextUrl} class="badge" class:disabled={!isDomLoaded || current >= total}>
		<NextIcon />
	</a>
	<a href={lastUrl} class="badge" class:disabled={!isDomLoaded || current >= total}>
		<LastIcon />
	</a>

	<!--{#if isSettingsOpen}
		<div class="pagination-settings">
			<div class="content">
				<div class="join">
					<label class="join-item input">
						Page
						<input type="text" class="grow" placeholder="{current.toString()}" />
					</label>
					<button class="join-item btn btn-sm">OK</button>
				</div>
			</div>
		</div>
	{/if}-->
</div>

<style lang="postcss">
	@reference "$lib/../app.css";
	.pagination {
		@apply relative flex items-center gap-1;
		.badge {
			@apply rounded-full bg-base-200 sm:badge-lg;
			&:hover {
				@apply bg-base-300;
			}
			&.disabled {
				@apply pointer-events-none cursor-default opacity-70;
			}
		}

		.pagination-settings {
			@apply absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2;
			@apply flex w-full flex-col rounded-2xl bg-base-300 p-2;
			.content {
				@apply flex flex-col gap-2 rounded-xl bg-base-100;
			}
		}
	}
</style>
