import { use } from 'react';
import Home from '../page';
import { isSupportedLocale, DEFAULT_LOCALE } from '../lib/i18n';

export default function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return <Home locale={safeLocale} />;
}
