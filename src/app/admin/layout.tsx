import type { Metadata } from 'next';

// Админка закрыта от индексации (дополнительно — X-Robots-Tag в next.config и Disallow в robots)
export const metadata: Metadata = {
  title: { absolute: 'Админка — НПП «Биохиммаш»' },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
