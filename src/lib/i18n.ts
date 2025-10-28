import { browser } from '$app/environment';
import { addMessages, init, locale } from 'svelte-i18n';

const modules: Record<string, { default: any }> = import.meta.glob('./translations/*.json', { eager: true });

for (const path in modules) {
  const lang = path.replace('./translations/', '').replace('.json', '');
  addMessages(lang, modules[path].default);
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