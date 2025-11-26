import Container from '@/components/common/Container';
import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import CTA from '@/components/landing/CTA';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import Setup from '@/components/landing/Setup';
import Journey from '@/components/landing/Journey';
import React from 'react';
import { cn } from '@/lib/utils';

export default function page() {
  return (
    <section className='relative'>
      
      <Container className="min-h-screen py-16 relative z-10">
        <Hero />
        <Separator className='my-8'/> 
        <Experience />
        <Separator className='my-8'/> 
        <Work />
        <Separator className='my-8'/> 
        <About />
        <Separator className='my-8'/> 
        <Github />
        <Separator className='my-8'/> 
        <Blog />
        <Separator className='my-8'/> 
        <CTA />
        <Separator className='my-8'/> 
        <Setup />
        <Separator className='my-8'/> 
        <Journey />
        <Separator className='my-8'/> 
      </Container>
    </section>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative left-1/2 right-1/2 -mx-[50vw] flex h-8 w-screen border-y border-edge",
        "before:absolute before:left-0 before:-z-1 before:h-8 before:w-full",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}