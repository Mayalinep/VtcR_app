import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { SUPPORTED_LOCALES, type AppLocale } from '../lib/i18n';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as AppLocale)) {
    notFound();
  }

  return children;
}
