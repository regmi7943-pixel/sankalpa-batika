import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LayoutWrapper } from '@/components/layout/layout-wrapper';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Sankalpa Batika School',
    template: '%s | Sankalpa Batika'
  },
  description: 'Empowering Future Leaders. A premier institution for quality education in Kathmandu, Nepal.',
  keywords: ['school', 'education', 'kathmandu', 'nepal', 'admissions', 'sankalpa batika'],
  authors: [{ name: 'Sankalpa Batika School' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Sankalpa Batika School',
    title: 'Sankalpa Batika School',
    description: 'Empowering Future Leaders. A premier institution for quality education.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sankalpa Batika School',
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
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
