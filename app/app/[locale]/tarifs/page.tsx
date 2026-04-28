import { use } from 'react';
import Tarifs from '../../tarifs/page';
import { isSupportedLocale, DEFAULT_LOCALE } from '../../lib/i18n';

export default function LocalizedTarifs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return <Tarifs locale={safeLocale} />;
}
