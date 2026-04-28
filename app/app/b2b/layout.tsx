import { Bodoni_Moda, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import './b2b.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`b2b ${bodoni.variable} ${cormorant.variable} ${jetbrainsMono.variable}`} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}
