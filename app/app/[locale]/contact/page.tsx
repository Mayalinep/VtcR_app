import Contact from '../../contact/page';
import { isSupportedLocale, DEFAULT_LOCALE } from '../../lib/i18n';

export default async function LocalizedContact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return <Contact locale={safeLocale} />;
}
