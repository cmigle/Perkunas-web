import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Load translations from /public/i18n/*.json
async function loadResources() {
  const [lt, en] = await Promise.all([
    fetch('/i18n/lt.json').then((r) => r.json()),
    fetch('/i18n/en.json').then((r) => r.json())
  ]);
  return { lt: { translation: lt }, en: { translation: en } };
}

const resources = await loadResources();

await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'lt',
    supportedLngs: ['lt', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
