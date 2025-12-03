import ChatBubble from '@/components/common/ChatBubble';
import Footer from '@/components/common/Footer';
import OnekoCat from '@/components/common/OnekoCat';
import { Quote } from '@/components/common/Quote';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SiteHeader } from '@/components/site-header';
import type { ReactNode } from 'react';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <SiteHeader />
      <ScrollToTop />

      {children}
      <OnekoCat />
      <Quote />
      <Footer />
      <ChatBubble />
    </div>
  );
}

