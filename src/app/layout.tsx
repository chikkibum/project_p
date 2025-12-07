import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import ChatBubble from '@/components/common/ChatBubble';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import OnekoCat from '@/components/common/OnekoCat';
import { Quote } from '@/components/common/Quote';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import ReactLenis from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';
import './globals.css';
import SunlightBackground from '@/components/sunlightBg/sunlight-background';
import { fonts } from '@/lib/fonts';
import { JetBrains_Mono } from "next/font/google";

export const metadata = getMetadata('/');

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", ],
  variable: "--font-jetbrains-mono",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${fonts.satoshi.variable} ${jetbrainsMono.variable} font-sans overflow-x-hidden antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
        <SunlightBackground>
            <ReactLenis root>
              <div className="relative min-h-screen">
                {/* Left side pattern */}
                <div className="fixed top-0 left-0 h-full w-0 xs:w-[5%] sm:w-[10%] lg:w-[20%] xl:w-[25%] border-r border-edge  z-0" />
                
                {/* Right side pattern */}
                <div className="fixed top-0 right-0 h-full w-0 xs:w-[5%] sm:w-[10%] lg:w-[20%] xl:w-[25%] border-l border-edge  z-0" />
                
                {/* Main content wrapper with padding */}
                <div className="relative z-10 xs:px-[5%] sm:px-[10%] lg:px-[20%] xl:px-[25%]">
                  <Navbar />
                  {children}
                  <OnekoCat />
                  <Quote />
                  <Footer />
                  <ChatBubble />
                </div>
              </div>
              <UmamiAnalytics />  
            </ReactLenis>
            </SunlightBackground>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}