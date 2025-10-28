<script lang="ts">
	import { locale } from '$lib/i18n';

	const languages = [
		{ code: 'en', name: 'English', flag: '🇺🇸' },
		{ code: 'es', name: 'Spanish', flag: '🇪🇸' },
		{ code: 'fr', name: 'French', flag: '🇫🇷' },
		{ code: 'de', name: 'German', flag: '🇩🇪' },
		{ code: 'it', name: 'Italian', flag: '🇮🇹' },
		{ code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
		{ code: 'ru', name: 'Russian', flag: '🇷🇺' },
		{ code: 'zh', name: 'Chinese', flag: '🇨🇳' },
		{ code: 'ja', name: 'Japanese', flag: '🇯🇵' },
		{ code: 'ko', name: 'Korean', flag: '🇰🇷' },
		{ code: 'ar', name: 'Arabic', flag: '🇸🇦' },
		{ code: 'hi', name: 'Hindi', flag: '🇮🇳' },
		{ code: 'tr', name: 'Turkish', flag: '🇹🇷' },
		{ code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
		{ code: 'th', name: 'Thai', flag: '🇹🇭' },
		{ code: 'id', name: 'Indonesian', flag: '🇮🇩' },
		{ code: 'ms', name: 'Malay', flag: '🇲🇾' },
		{ code: 'sw', name: 'Swahili', flag: '🇹🇿' },
		{ code: 'zu', name: 'Zulu', flag: '🇿🇦' },
		{ code: 'xh', name: 'Xhosa', flag: '🇿🇦' },
		{ code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
		{ code: 'ha', name: 'Hausa', flag: '🇳🇬' },
		{ code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
		{ code: 'ig', name: 'Igbo', flag: '🇳🇬' },
		{ code: 'am', name: 'Amharic', flag: '🇪🇹' },
		{ code: 'so', name: 'Somali', flag: '🇸🇴' },
		{ code: 'ti', name: 'Tigrinya', flag: '🇪🇷' },
		{ code: 'om', name: 'Oromo', flag: '🇪🇹' },
		{ code: 'martian', name: 'Martian', flag: '🚀' },
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