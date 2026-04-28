import { use } from 'react';
import APropos from '../../a-propos/page';
import { isSupportedLocale, DEFAULT_LOCALE } from '../../lib/i18n';

export default function LocalizedAPropos({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return <APropos locale={safeLocale} />;
}
