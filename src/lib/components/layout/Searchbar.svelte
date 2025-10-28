<script lang="ts">
	import SearchIcon from 'virtual:icons/hugeicons/search-02';
	import {goto} from "$app/navigation";
	import {ethers} from "ethers";
	import { _ } from 'svelte-i18n';

	let className = '';
	export { className as class };

	let query = ''

	const redirect = () => {
		if(ethers.isAddress(query)) {
			goto(`/address/${query}`)
		} else if(String(query).startsWith('0x')) {
			goto(`/tx/${query}`)
		} else if(!isNaN(Number(query))) {
			goto(`/block/${query}`)
		}
	}

	const onKeypress = (e: any) => {
		if(e.key === 'Enter') {
			redirect()
		}
	}
</script>

<div class="searchbar-wrapper {className}">
	<input
		type="search"
		placeholder={$_('search.placeholder')}
		on:keypress={onKeypress}
		bind:value={query}
	/>
	<button on:click={redirect}>
		<SearchIcon />
	</button>
</div>

<style lang="postcss">
	@reference "$lib/../app.css";
	.searchbar-wrapper {
		@apply input px-4 pl-6;
		@apply border-0 !rounded-full !bg-base-100;
		&:hover {
			@apply bg-base-300;
		}
		input {
			@apply w-full;
		}
		button {
			@apply cursor-pointer;
		}
	}
</style>
