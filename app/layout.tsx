import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Caepy',
  description: 'Caepy — AI-assisted doctor onboarding and practice management platform.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
