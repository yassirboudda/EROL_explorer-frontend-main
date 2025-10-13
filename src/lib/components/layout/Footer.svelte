<script lang="ts">
	import {
		PUBLIC_MARTIAN_SITE,
		PUBLIC_EROL_SITE,
		PUBLIC_MARTIAN_TWITTER,
		PUBLIC_EROL_TWITTER,
		PUBLIC_MARTIAN_GITHUB,
		PUBLIC_MARTIAN_VOTE,
		PUBLIC_MARTIAN_DOCS,
		PUBLIC_MARTIAN_SUBNET
	} from '$env/static/public';
	import ExternalLink from 'virtual:icons/hugeicons/link-square-02';

	const spotlightLinks = [
		{ label: 'MartianChain.com', href: PUBLIC_MARTIAN_SITE },
		{ label: 'Docs', href: PUBLIC_MARTIAN_DOCS },
		{ label: 'Subnet Explorer', href: PUBLIC_MARTIAN_SUBNET },
		{ label: 'Vote for Martian', href: PUBLIC_MARTIAN_VOTE }
	].filter((link) => Boolean(link.href));

	const communityLinks = [
		{ label: 'GitHub', href: PUBLIC_MARTIAN_GITHUB },
		{ label: 'X / Martian Chain', href: PUBLIC_MARTIAN_TWITTER },
		{ label: 'X / $EROL', href: PUBLIC_EROL_TWITTER },
		{ label: 'ErolMusk.com', href: PUBLIC_EROL_SITE }
	].filter((link) => Boolean(link.href));
</script>

<footer class="footer">
	<div class="footer__top">
		<div class="footer__brand">
			<div class="footer__logo">
				<img src="/MartianScanLogo.png" alt="MartianScan logo" />
				<div>
					<h3>MartianScan</h3>
					<p class="caption">Martian Chain explorer</p>
				</div>
			</div>
			<p class="tagline">MartianScan brings real-time visibility to blocks, transactions, and contracts across the $EROL ecosystem.</p>
		</div>
		<div class="footer__links">
			<div>
				<h4>Spotlight</h4>
				<ul>
					{#each spotlightLinks as link}
						<li>
							<a href={link.href} target="_blank" rel="noreferrer">
								<span>{link.label}</span>
								<ExternalLink />
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<h4>Community</h4>
				<ul>
					{#each communityLinks as link}
						<li>
							<a href={link.href} target="_blank" rel="noreferrer">
								<span>{link.label}</span>
								<ExternalLink />
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
	<div class="footer__bottom">
		<div class="footer__credits">
			<span>Built by</span>
			<img src="/logo.png" alt="AMI Logo" height="18" width="18" />
			<span>Team</span>
			<span class="sep">•</span>
			<span>{new Date().getFullYear()}</span>
		</div>
		<a class="footer__cta" href="https://x.com/amichainORG" target="_blank" rel="noreferrer">
			<span>Explorer as a Service (EaaS)</span>
			<ExternalLink />
		</a>
	</div>
</footer>

<style lang="postcss">
	@reference "$lib/../app.css";
	.footer {
		@apply mt-auto w-full bg-base-300/90 backdrop-blur px-4 py-6 text-sm;
	}

	.footer__top {
		@apply container mx-auto flex flex-col gap-6 rounded-3xl bg-base-200/60 p-6 sm:flex-row sm:items-start sm:justify-between;
	}

	.footer__brand {
		@apply flex-1;
	}

	.footer__logo {
		@apply flex items-center gap-3;
	}

	.footer__logo img {
		@apply h-10 w-10 rounded-xl object-contain shadow;
	}

	.footer__brand h3 {
		@apply text-xl font-semibold;
	}

	.caption {
		@apply text-xs uppercase tracking-wide text-base-content/70;
	}

	.tagline {
		@apply mt-3 text-sm text-base-content/80;
	}

	.footer__links {
		@apply grid w-full gap-6 sm:w-auto sm:grid-cols-2;
	}

	.footer__links h4 {
		@apply text-sm font-semibold uppercase tracking-wide text-base-content/70;
	}

	.footer__links ul {
		@apply mt-3 flex flex-col gap-2;
	}

	.footer__links a {
		@apply inline-flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-base-300;
	}

	.footer__links a :global(svg) {
		@apply text-xs;
	}

	.footer__bottom {
		@apply container mx-auto mt-4 flex flex-col items-center justify-between gap-3 rounded-3xl bg-base-200/60 px-6 py-4 text-xs sm:flex-row;
	}

	.footer__credits {
		@apply flex items-center gap-2;
	}

	.footer__credits img {
		@apply h-4 w-4;
	}

	.sep {
		@apply hidden sm:inline;
	}

	.footer__cta {
		@apply inline-flex items-center gap-2 rounded-lg bg-base-100 px-3 py-1.5 font-medium transition hover:bg-base-300;
	}

	@media (max-width: theme('screens.sm')) {
		.footer {
			@apply px-3 py-5;
		}
	}
</style>
