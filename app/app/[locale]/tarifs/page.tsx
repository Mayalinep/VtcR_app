import Tarifs from '../../tarifs/page';
import { isSupportedLocale, DEFAULT_LOCALE } from '../../lib/i18n';

export default async function LocalizedTarifs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return <Tarifs locale={safeLocale} />;
}
