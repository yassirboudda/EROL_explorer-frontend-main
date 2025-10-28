import { browser } from '$app/environment';
import { addMessages, init, locale } from 'svelte-i18n';

const modules: Record<string, { default: any }> = import.meta.glob('./translations/*.json', { eager: true });

for (const path in modules) {
  const lang = path.replace('./translations/', '').replace('.json', '');
  addMessages(lang, modules[path].default);
}

function getBrowserLanguage(): string | null {
  if (!browser || !navigator) return null;
  
  // Check navigator.languages first (array of preferred languages)
  const languages = navigator.languages || [navigator.language];
  
  // List of supported languages (from the translation files)
  const supportedLanguages = Object.keys(modules).map(path => 
    path.replace('./translations/', '').replace('.json', '')
  );
  
  // Find the first supported language that matches
  for (const lang of languages) {
    const langCode = lang.split('-')[0]; // Get language code without region (e.g., 'en' from 'en-US')
    if (supportedLanguages.includes(langCode)) {
      return langCode;
    }
  }
  
  return null; // No supported language found
}

init({
  fallbackLocale: 'en',
  initialLocale: browser ? localStorage.getItem('language') || getBrowserLanguage() || 'en' : 'en',
  handleMissingMessage: ({ locale, id }) => `${locale}: ${id}`
});

if (browser) {
  locale.subscribe(l => {
    document.documentElement.dir = (l && ['ar'].includes(l)) ? 'rtl' : 'ltr';
  });
}

export { locale };