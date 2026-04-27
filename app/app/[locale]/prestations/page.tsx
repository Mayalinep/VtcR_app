import Prestations from '../../prestations/page';
import { isSupportedLocale, DEFAULT_LOCALE } from '../../lib/i18n';

export default async function LocalizedPrestations({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return <Prestations locale={safeLocale} />;
}
