import { use } from 'react';
import Prestations from '../../prestations/page';
import { isSupportedLocale, DEFAULT_LOCALE } from '../../lib/i18n';

export default function LocalizedPrestations({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return <Prestations locale={safeLocale} />;
}
