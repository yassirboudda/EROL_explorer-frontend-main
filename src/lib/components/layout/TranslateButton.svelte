<script lang="ts">
	import { locale } from '$lib/i18n';
	import { _ } from 'svelte-i18n';

	const languages = [
		{ code: 'en', name: $_('languages.en'), flag: '🇺🇸' },
		{ code: 'es', name: $_('languages.es'), flag: '🇪🇸' },
		{ code: 'fr', name: $_('languages.fr'), flag: '🇫🇷' },
		{ code: 'de', name: $_('languages.de'), flag: '🇩🇪' },
		{ code: 'it', name: $_('languages.it'), flag: '🇮🇹' },
		{ code: 'pt', name: $_('languages.pt'), flag: '🇵🇹' },
		{ code: 'ru', name: $_('languages.ru'), flag: '🇷🇺' },
		{ code: 'zh', name: $_('languages.zh'), flag: '🇨🇳' },
		{ code: 'ja', name: $_('languages.ja'), flag: '🇯🇵' },
		{ code: 'ko', name: $_('languages.ko'), flag: '🇰🇷' },
		{ code: 'ar', name: $_('languages.ar'), flag: '🇸🇦' },
		{ code: 'hi', name: $_('languages.hi'), flag: '🇮🇳' },
		{ code: 'tr', name: $_('languages.tr'), flag: '🇹🇷' },
		{ code: 'vi', name: $_('languages.vi'), flag: '🇻🇳' },
		{ code: 'th', name: $_('languages.th'), flag: '🇹🇭' },
		{ code: 'id', name: $_('languages.id'), flag: '🇮🇩' },
		{ code: 'ms', name: $_('languages.ms'), flag: '🇲🇾' },
		{ code: 'sw', name: $_('languages.sw'), flag: '🇹🇿' },
		{ code: 'zu', name: $_('languages.zu'), flag: '🇿🇦' },
		{ code: 'xh', name: $_('languages.xh'), flag: '🇿🇦' },
		{ code: 'af', name: $_('languages.af'), flag: '🇿🇦' },
		{ code: 'ha', name: $_('languages.ha'), flag: '🇳🇬' },
		{ code: 'yo', name: $_('languages.yo'), flag: '🇳🇬' },
		{ code: 'ig', name: $_('languages.ig'), flag: '🇳🇬' },
		{ code: 'am', name: $_('languages.am'), flag: '🇪🇹' },
		{ code: 'so', name: $_('languages.so'), flag: '🇸🇴' },
		{ code: 'ti', name: $_('languages.ti'), flag: '🇪🇷' },
		{ code: 'om', name: $_('languages.om'), flag: '🇪🇹' },
		{ code: 'martian', name: $_('languages.martian'), flag: '🚀' },
	];

	function setLang(lang: string) {
		locale.set(lang);
		if (typeof window !== 'undefined') {
			localStorage.setItem('language', lang);
		}
	}
</script>

<div class="dropdown dropdown-end">
	<button class="btn btn-ghost" tabindex="0">👽</button>
	<ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
		{#each languages as lang}
			<li><button on:click={() => setLang(lang.code)} class="w-full text-left">{lang.name} {lang.flag}</button></li>
		{/each}
	</ul>
</div>