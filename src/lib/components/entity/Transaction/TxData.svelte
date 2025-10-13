<script lang="ts">
	import { TextareaAutosize } from '$lib/directives/TextareaAutosize';
	import ClipboardCopyBtn from '$lib/components/utilities/ClipboardCopyBtn.svelte';

	export let tx;

	let params: string[] = [];

	let decodedData = '';
	let error = false;

	/*const arrayToString = (arr: any[], prefix = true) => {
		let str = '';
		for (const [k, v] of Object.entries(arr)) {
			if (prefix) str += `[${k}] `;
			if (typeof v === 'string') {
				str += v;
				str += '\n';
			} else {
				str += arrayToString(Array(v).join(',').split(','), false);
			}
		}
		return str;
	};*/

	/*if (txMethod) decodedData += `Function: ${txMethod}\n\n`;
	decodedData += `MethodID: ${tx?.data?.slice(0, 10)}\n\n`;
	if (params.length) decodedData += arrayToString(params);*/
</script>

{#if tx?.data?.length > 2}
	<div class="row">
		<div class="label mt-1 mb-auto">Data</div>
		<div class="tabs-border relative tabs w-full rounded-xl bg-base-200 p-2">
			<input type="radio" name="data_tabs" class="tab" aria-label="Raw" checked />
			<div class="tab-content">
				{#if tx.data}
					<ClipboardCopyBtn value={tx.data} wrapperClass="absolute top-2 right-2" />
				{/if}
				<textarea class="textarea" use:TextareaAutosize readonly
					>{tx.data ?? 'No data found for this transaction'}</textarea
				>
			</div>

			{#if params?.length && error === false}
				<input type="radio" name="data_tabs" class="tab" aria-label="Decoded" />
				<div class="tab-content">
					<ClipboardCopyBtn value={decodedData} wrapperClass="absolute top-2 right-2" />
					<textarea class="textarea" use:TextareaAutosize readonly>{decodedData}</textarea>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	@reference "$lib/../app.css";
	.textarea {
		@apply w-full wrap-break-word whitespace-pre-wrap;
	}
</style>
