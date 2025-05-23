"use client";

import React, { useRef, useEffect, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface MouseGlowEffectProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MouseGlowEffect({ children, className, ...props }: MouseGlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = ev;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', updateMousePosition);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', updateMousePosition);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={cn('mouse-glow-container', className)} {...props}>
      {children}
    </div>
  );
}
