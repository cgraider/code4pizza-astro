import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HEADER_OFFSET = 88;

function getOffsetTop(el: HTMLElement, container: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== container) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

/**
 * Intercepts in-page hash links, scrolls the window smoothly to the target section
 * (so the GSAP scroll proxy updates), then refreshes ScrollTrigger so section
 * animations "load" and run correctly.
 */
export function useHashScroll(contentRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || !link.hash) return;
      const hash = link.hash.slice(1);
      if (!hash) return;
      const el = content.querySelector(`#${CSS.escape(hash)}`) as HTMLElement | null;
      if (!el) return;

      e.preventDefault();
      const top = Math.max(0, getOffsetTop(el, content) - HEADER_OFFSET);
      window.scrollTo({ top, behavior: 'smooth' });
      // After smooth scroll settles, refresh so section ScrollTriggers run and content "loads"
      setTimeout(() => ScrollTrigger.refresh(), 900);
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [contentRef]);
}
