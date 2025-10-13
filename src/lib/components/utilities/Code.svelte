<script lang="ts">
	import 'highlight.js/styles/vs2015.min.css';
	import hljs from 'highlight.js';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import json from 'highlight.js/lib/languages/json';
	import text from 'highlight.js/lib/languages/plaintext';
	import { onMount } from 'svelte';
	import CopyIcon from 'virtual:icons/hugeicons/copy-01';
	import ExpandIcon from 'virtual:icons/hugeicons/arrow-expand';
	import ShrinkIcon from 'virtual:icons/hugeicons/arrow-shrink';

	export let codeClass = '';
	export let code = '';
	export let language = 'svelte';
	export let title: string | null = null;
	export let copyButton = true;

	let isExpanded = false;
	let copyText = 'copy';

	const clipboardCopy = (str?: string) => {
		if (navigator.clipboard.write) {
			navigator.clipboard.write([
				new ClipboardItem({
					['text/plain']: new Blob([str || ''], {
						type: 'text/plain'
					})
				})
			]);
		} else {
			navigator.clipboard.writeText(String(str));
		}

		copyText = 'copied !';
		setTimeout(() => {
			copyText = 'copy';
		}, 1000);
	};

	onMount(() => {
		hljs.registerLanguage('javascript', javascript);
		hljs.registerLanguage('typescript', typescript);
		hljs.registerLanguage('json', json);
		hljs.registerLanguage('text', text);
	});
</script>

<div class="code {!title ? 'no-title' : ''}" {...$$restProps}>
	<div class="header">
		{#if title}
			<div class="title">{title}</div>
		{/if}
		<div class="ml-auto"></div>
		{#if copyButton && code}
			<button class="copy" on:click={() => clipboardCopy(code)}>
				<CopyIcon />
				<span>{copyText}</span>
			</button>
		{/if}
		<button class="btn btn-circle bg-base-300" on:click={() => (isExpanded = !isExpanded)}>
			{#if isExpanded}
				<ShrinkIcon class="text-lg" />
			{:else}
				<ExpandIcon class="text-lg" />
			{/if}
		</button>
	</div>

	<pre class:expanded={isExpanded}><code class={codeClass}
			><slot>{@html hljs.highlight(code.trim(), { language }).value}</slot></code
		></pre>
</div>

<style lang="postcss">
	@reference "$lib/../app.css";

	.code {
		@apply relative rounded-2xl bg-base-100 p-2;
	}
	.code pre {
		@apply overflow-auto rounded-xl !bg-base-200 p-2;
		@apply wrap-anywhere wrap-break-word whitespace-pre-wrap;
		&:not(.expanded) {
			max-height: 300px;
		}
	}
	.code.no-title pre {
		@apply rounded-t-lg;
	}
	.code pre code {
		@apply text-primary-content;
		text-shadow: none !important;
	}

	.header {
		@apply sticky top-17;
		@apply flex items-center gap-2 px-4 py-2 capitalize;
		@apply rounded-2xl bg-base-100;
		z-index: 9 !important;
	}
	.copy {
		@apply btn cursor-pointer bg-base-300;
	}
	.copy:hover {
		@apply bg-base-300;
	}
</style>
