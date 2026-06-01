import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import LogoBrand from '@/components/LogoBrand';

export default function FloatingCTA() {
  const barRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const [shouldBeOpen, setShouldBeOpen] = useState(false);

  // 1. Unified Matrix Scroll Reader
  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollContainer = document.getElementById('content') || document.querySelector('main');
      let currentScroll = window.scrollY;

      if (scrollContainer) {
        const transformMatrix = window.getComputedStyle(scrollContainer).transform;
        if (transformMatrix && transformMatrix !== 'none') {
          const matrixValues = transformMatrix.split('(')[1].split(')')[0].split(',');
          currentScroll = Math.abs(parseFloat(matrixValues[5]));
        }
      }

      const threshold = window.innerHeight * 0.7;

      if (currentScroll < 20) {
        setShouldBeOpen(false);
      } else {
        setShouldBeOpen(currentScroll > threshold);
      }
    };

    const pollInterval = setInterval(checkScrollPosition, 30);
    return () => clearInterval(pollInterval);
  }, []);

  // 2. Elevator Slide Motion Engine
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.killTweensOf([bar, innerRef.current, textRef.current, btnRef.current]);

    if (shouldBeOpen) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(bar, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
      if (innerRef.current) {
        tl.fromTo(innerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '-=0.15');
      }
      const staggerEls = [textRef.current, btnRef.current].filter(Boolean);
      if (staggerEls.length) {
        tl.fromTo(staggerEls,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.25, ease: 'back.out(1.2)' },
          '-=0.1'
        );
      }
    } else {
      const tl = gsap.timeline({ defaults: { ease: 'power2.in' } });
      if (innerRef.current) {
        tl.to(innerRef.current, { opacity: 0, duration: 0.15 }, 0);
      }
      tl.to(bar, { y: 120, opacity: 0, duration: 0.3 }, '-=0.05');
    }
  }, [shouldBeOpen]);

  return (
    <div
      ref={barRef}
      className="hidden sm:block fixed bottom-5 left-1/2 -translate-x-1/2 z-40 glass-bar border border-border/60 rounded-2xl overflow-hidden p-[12px_16px]"
      role="banner"
      aria-label="Call to action"
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        willChange: 'transform, opacity',
        width: 'min(96%, 540px)',
        opacity: 0,
        transform: 'translateY(120px)',
      }}
    >
      <div ref={innerRef} className="flex items-center justify-between gap-3 opacity-0">
        <div className="flex items-center gap-3 min-w-0">
          <LogoBrand size={28} animate={false} className="shrink-0" />
          <p ref={textRef} className="text-sm text-foreground/90 font-medium truncate whitespace-nowrap">
            Ready to build something great?
          </p>
        </div>
        <a
          ref={btnRef}
          href="#contacts"
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 whitespace-nowrap"
        >
          Start a project
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}