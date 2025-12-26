import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteLayout } from '@/components/layout/site-layout';
import { LayoutWrapper } from '@/components/layout/layout-wrapper';
import { Toaster } from 'sonner';
import { SecretEntry } from '@/components/secret-entry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Sankalpa Vatika School',
    template: '%s | Sankalpa Vatika'
  },
  description: 'Sankalpa Vatika School - Nurturing minds, building character, and shaping the future leaders of tomorrow.',
  keywords: ['school', 'education', 'kathmandu', 'nepal', 'admissions', 'sankalpa vatika'],
  authors: [{ name: 'Sankalpa Vatika School' }],
  creator: 'Sankalpa Vatika School',
  publisher: 'Sankalpa Vatika School',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sankalpavatika.edu.np',
    siteName: 'Sankalpa Vatika School',
    title: 'Sankalpa Vatika School',
    description: 'Nurturing minds, building character, and shaping future leaders.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sankalpa Vatika School',
    description: 'Empowering Future Leaders.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SecretEntry />
          <LayoutWrapper
            siteLayout={
              <SiteLayout>
                {children}
              </SiteLayout>
            }
          >
            {children}
          </LayoutWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
