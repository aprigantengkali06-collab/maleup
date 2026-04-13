// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/Providers';
import { ServiceWorkerRegister } from '@/components/layout/ServiceWorkerRegister';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MaleUp',
  description: 'Aplikasi 24 minggu pelacak penurunan berat badan & peningkatan kesehatan pria.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'MaleUp',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: ['/icons/icon-192.svg', '/icons/icon-512.svg'],
    apple: '/icons/icon-192.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} font-sans bg-zinc-950 text-zinc-50 antialiased`}>
        <Providers>
          <ServiceWorkerRegister />
          <div className="relative mx-auto max-w-[480px] min-h-screen">
            {children}
          </div>
          <Toaster
            theme="dark"
            position="top-center"
            richColors
            toastOptions={{
              style: {
                background: '#18181b',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fafafa',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
