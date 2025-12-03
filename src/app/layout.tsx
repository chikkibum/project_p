import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import SunlightBackground from '@/components/sunlightBg/sunlight-background';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { fonts } from '@/lib/fonts';
import ReactLenis from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';
import { JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata = getMetadata('/');

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${fonts.satoshi.variable} ${jetbrainsMono.variable} font-sans overflow-x-hidden antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SunlightBackground>
              <ReactLenis root>
                {children}
                <UmamiAnalytics />
              </ReactLenis>
            </SunlightBackground>
          </ThemeProvider>
          {/* <SiteFooter /> */}
        </body>
      </html>
    </ViewTransitions>
  );
}
