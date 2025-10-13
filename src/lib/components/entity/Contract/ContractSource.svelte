<script lang="ts">
	import { PUBLIC_SOURCIFY_VERIFY_URL } from '$env/static/public';
	import Code from '$lib/components/utilities/Code.svelte';
	import ClipboardCopyBtn from '$lib/components/utilities/ClipboardCopyBtn.svelte';

	export let isLoading = false;
	export let entity: any = {};

		const SOURCES_KEY = 'sources';
		$: sources = (entity?.[SOURCES_KEY] ?? {}) as Record<string, { content?: string }>;
</script>

{#if !isLoading && !entity?.abi?.length && !entity?.sources?.length}
	<div class="section">
		<div class="row text-base-content/50">
			<span>Contract is not verified yet. Owner? You can</span>
			<a href={PUBLIC_SOURCIFY_VERIFY_URL} target="_blank" class="text-primary">Verify & publish</a>
			<span>your contract</span>
		</div>
	</div>
{/if}

{#if isLoading}
	<div class="h-64 w-full skeleton rounded-2xl p-2"></div>
{:else if entity}
	{#if entity?.compilation?.name || entity?.compilation?.compilerVersion || entity?.compilation?.compilerSettings?.optimizer?.enabled}
		<div class="section">
			{#if entity?.compilation?.name}
				<div class="row">
					<div class="label">Contract Name</div>
					<div class="value">
						<span>{entity.compilation.name}</span>
						<ClipboardCopyBtn value={entity.compilation.name} />
					</div>
				</div>
			{/if}
			{#if entity?.compilation?.compilerVersion}
				<div class="row">
					<div class="label">Compiler Version</div>
					<div class="value">
						<span>{entity.compilation.compilerVersion}</span>
						<ClipboardCopyBtn value={entity.compilation.compilerVersion} />
					</div>
				</div>
			{/if}
			{#if entity?.compilation?.compilerSettings?.optimizer?.enabled}
				<div class="row">
					<div class="label">Optimization</div>
					<div class="value py-3">
						{entity?.compilation?.compilerSettings?.optimizer?.runs} runs
					</div>
				</div>
			{/if}
		</div>
	{/if}

	{#if Object.keys(sources).length > 0}
		{#each Object.entries(sources) as [filename, source]}
			<Code title={filename} language="javascript" code={source?.content ?? ''} />
		{/each}
	{/if}

	{#if Array.isArray(entity?.abi) && entity.abi.length > 0}
		<Code title="Contract ABI" language="json" code={JSON.stringify(entity.abi, null, 2)} />
	{/if}
{/if}

{#if entity?.bytecode}
	<Code title="Bytecode" language="text" code={entity.bytecode} />
{/if}

{#if !isLoading && entity && entity?.creationBytecode?.sourceMap}
	<Code title="Sourcemap" language="text" code={entity.creationBytecode.sourceMap} />
{/if}
