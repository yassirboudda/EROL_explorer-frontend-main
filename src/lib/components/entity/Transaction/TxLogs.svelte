<script lang="ts">
	import { TextareaAutosize } from '$lib/directives/TextareaAutosize';
	import ClipboardCopyBtn from '$lib/components/utilities/ClipboardCopyBtn.svelte';

	export let isLoading = false;
	export let logs: any = [];
</script>

{#if logs?.length}
	<div class="row">
		<div class="label mt-1 mb-auto">Logs</div>

		<div class="tabs-border relative tabs w-full rounded-xl bg-base-200 p-2">
			<input type="radio" name="logs_tabs" class="tab" aria-label="Raw" checked />
			<div class="tab-content">
				<ClipboardCopyBtn
					value={JSON.stringify(logs, null, 4)}
					wrapperClass="absolute top-2 right-2"
				/>
				<textarea class="textarea w-full" rows="14" readonly
					>{JSON.stringify(logs, null, 4)}</textarea
				>
			</div>

			<input type="radio" name="logs_tabs" class="tab" aria-label="Formatted" />
			<div class="tab-content">
				<div class="flex flex-col gap-2">
					{#each logs as log}
						<div class="log-item">
							<div class="index">{log.index}</div>
							<div class="content">
								{#if log.address}
									<div class="row">
										<div class="label">Address</div>
										<div class="value">
											<span>{log.address}</span>
											<ClipboardCopyBtn value={log.address} />
										</div>
									</div>
								{/if}
								{#if log.topics}
									<div class="row">
										<div class="label mb-auto">Topics</div>
										<div class="flex flex-col gap-1">
											{#each log.topics as topic}
												<div class="value">
													<span>{topic}</span>
													<ClipboardCopyBtn value={topic} />
												</div>
											{/each}
										</div>
									</div>
								{/if}
								{#if log.data}
									<div class="row">
										<div class="label">Data</div>
										<textarea
											class="textarea !min-h-9 w-full bg-base-200"
											use:TextareaAutosize
											readonly>{log.data}</textarea
										>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

			{#if isLoading}
				<div class="tab px-8">
					<div class="loading loading-xs loading-dots"></div>
				</div>
			{:else}
				<input type="radio" name="logs_tabs" class="tab" aria-label="Decoded" />
				<div class="tab-content"></div>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	@reference "$lib/../app.css";
	.log-item {
		@apply flex rounded-xl bg-base-100 p-2;
		.index {
			@apply mb-auto flex items-center justify-center p-2 px-4;
			@apply rounded-2xl bg-base-200;
			@apply text-2xl font-thin tabular-nums;
		}
		.content {
			@apply flex flex-col gap-2;
			.label {
				@apply !min-w-18;
			}
		}
	}
</style>
