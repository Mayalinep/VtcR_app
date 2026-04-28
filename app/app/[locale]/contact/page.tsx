import { use } from 'react';
import Contact from '../../contact/page';
import { isSupportedLocale, DEFAULT_LOCALE } from '../../lib/i18n';

export default function LocalizedContact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return <Contact locale={safeLocale} />;
}
