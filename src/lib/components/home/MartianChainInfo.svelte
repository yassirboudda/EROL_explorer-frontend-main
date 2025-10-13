<script lang="ts">
	import {
		PUBLIC_CHAIN_NAME,
		PUBLIC_CHAIN_ID,
		PUBLIC_CHAIN_BLOCK_TIME,
		PUBLIC_CHAIN_GAS_LIMIT,
		PUBLIC_CHAIN_BASE_FEE,
		PUBLIC_NATIVE_SYMBOL,
		PUBLIC_MARTIAN_DOCS,
		PUBLIC_MARTIAN_SUBNET,
		PUBLIC_MARTIAN_SITE,
		PUBLIC_EROL_SITE,
		PUBLIC_MARTIAN_VOTE,
		PUBLIC_MARTIAN_GITHUB,
		PUBLIC_MARTIAN_TWITTER,
		PUBLIC_EROL_TWITTER
	} from '$env/static/public';

	const formatNumber = (value?: string) => {
		if (!value) return null;
		return Number(value).toLocaleString();
	};

	const atAGlance = [
		{ label: 'Chain Name', value: PUBLIC_CHAIN_NAME },
		{ label: 'Chain ID', value: PUBLIC_CHAIN_ID },
		{ label: 'Block Time', value: PUBLIC_CHAIN_BLOCK_TIME ? `${PUBLIC_CHAIN_BLOCK_TIME} seconds` : null },
		{ label: 'Gas Limit', value: PUBLIC_CHAIN_GAS_LIMIT ? formatNumber(PUBLIC_CHAIN_GAS_LIMIT) : null },
		{ label: 'Base Fee', value: PUBLIC_CHAIN_BASE_FEE ? `${PUBLIC_CHAIN_BASE_FEE} gwei` : null },
		{ label: 'Native Token', value: PUBLIC_NATIVE_SYMBOL }
	];

	const resourceLinks = [
		{ label: 'Docs', href: PUBLIC_MARTIAN_DOCS },
		{ label: 'Subnet Explorer', href: PUBLIC_MARTIAN_SUBNET },
		{ label: 'MartianChain.com', href: PUBLIC_MARTIAN_SITE },
		{ label: 'ErolMusk.com', href: PUBLIC_EROL_SITE },
		{ label: 'Vote for Martian', href: PUBLIC_MARTIAN_VOTE },
		{ label: 'GitHub', href: PUBLIC_MARTIAN_GITHUB },
		{ label: 'X / Martian Chain', href: PUBLIC_MARTIAN_TWITTER },
		{ label: 'X / $EROL', href: PUBLIC_EROL_TWITTER }
	].filter((link) => Boolean(link.href));
</script>

<section class="martian-card">
	<h2>Martian Chain highlights</h2>
	<ul class="spec-list">
		{#each atAGlance as item}
			{#if item.value}
				<li>
					<span>{item.label}</span>
					<strong>{item.value}</strong>
				</li>
			{/if}
		{/each}
	</ul>
	{#if resourceLinks.length}
		<div class="resource-list">
			{#each resourceLinks as link}
				<a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
			{/each}
		</div>
	{/if}
</section>

<style lang="postcss">
	@reference "$lib/../app.css";
	.martian-card {
		@apply flex h-full w-full flex-col gap-2 rounded-2xl bg-base-200 p-4;
	}

	h2 {
		@apply text-lg font-semibold;
	}

	.spec-list {
		@apply flex flex-col gap-2;
	}

	li {
		@apply flex items-center justify-between gap-4 rounded-xl bg-base-100 px-4 py-2 text-sm;
	}

	.resource-list {
		@apply flex flex-wrap gap-2;
	}

	.resource-list a {
		@apply badge badge-outline gap-1 px-3 py-2 text-xs font-medium uppercase;
	}
</style>
