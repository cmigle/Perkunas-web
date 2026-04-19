import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'lt';
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <div className="mono-tag text-brand-400 mb-4">404 · NOT FOUND</div>
      <h1 className="text-6xl font-black text-white tracking-tight mb-4">
        {lang === 'en' ? 'Lost a lap' : 'Pasiklydai trasoje'}
      </h1>
      <p className="text-white/60 mb-8">
        {lang === 'en'
          ? "We can't find the page you're looking for. Let's get back to pit lane."
          : 'Nepavyko rasti puslapio. Grįžkime į depą.'}
      </p>
      <Button as={Link} to="/" color="primary" size="lg" radius="full" className="font-bold">
        {lang === 'en' ? 'Back home' : 'Grįžti namo'}
      </Button>
    </div>
  );
}
