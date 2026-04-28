import { use } from 'react';
import FAQ from '../../faq/page';
import { isSupportedLocale, DEFAULT_LOCALE } from '../../lib/i18n';

export default function LocalizedFAQ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return <FAQ locale={safeLocale} />;
}
