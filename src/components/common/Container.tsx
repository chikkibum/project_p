import React, { type ComponentProps } from 'react';

import { BlurFade } from '@/components/Blur-fade';
import { cn } from '@/lib/utils';

type ContainerProps = Omit<ComponentProps<typeof BlurFade>, 'className' | 'children'> & {
  className?: string;
  children: React.ReactNode;
};

export default function Container({ children, className, ...props }: ContainerProps) {
  return (
    <BlurFade
      className={cn('container  mx-auto max-w-3xl px-4', className)}
      inView
      staggerChildren={0.1}
      delayChildren={0.02}
      {...props}
    >
      {children}
    </BlurFade>
  );
}
