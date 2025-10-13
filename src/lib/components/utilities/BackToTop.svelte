<script lang="ts">
	import ChevronUpIcon from 'virtual:icons/hugeicons/arrow-up-01';

	let scrollY = 0;

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

<svelte:window on:scroll={() => (scrollY = window.scrollY)} />

<button
	class="fixed right-4 bottom-4 flex cursor-pointer items-center justify-center rounded-2xl bg-black p-2"
	class:hidden={scrollY <= 1}
	on:click={scrollToTop}
>
	<ChevronUpIcon class="text-2xl" />
</button>
