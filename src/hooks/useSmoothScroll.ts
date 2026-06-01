import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll via viewport/content wrapper: viewport is fixed, content is translated
 * based on window scroll. Uses ScrollTrigger.scrollerProxy so triggers inside content
 * work correctly. No paid ScrollSmoother required.
 */
export function useSmoothScroll(viewportRef: React.RefObject<HTMLElement | null>, contentRef: React.RefObject<HTMLElement | null>, smoothness = 1.5) {
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    gsap.set(viewport, {
      overflow: 'hidden',
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    });
    gsap.set(content, { overflow: 'visible', width: '100%' });

    const getY = gsap.getProperty(content, 'y') as () => number;
    const setY = gsap.quickSetter(content, 'y', 'px');
    const setWindowScroll = ScrollTrigger.getScrollFunc(window);

    let height = 0;
    let isProxyScrolling = false;

    function refreshHeight() {
      content.style.overflow = 'visible';
      height = content.scrollHeight;
      document.body.style.height = `${height}px`;
      return height - document.documentElement.clientHeight;
    }

    ScrollTrigger.addEventListener('refresh', () => {
      content.style.overflow = 'visible';
      requestAnimationFrame(() => { content.style.overflow = 'visible'; });
    });

    ScrollTrigger.defaults({ scroller: content });

    ScrollTrigger.scrollerProxy(content, {
      scrollTop(value) {
        if (arguments.length) {
          isProxyScrolling = true;
          setY(-value);
          setWindowScroll(value);
          return;
        }
        return -getY();
      },
      scrollHeight: () => document.body.scrollHeight,
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    function killScrub(trigger: ScrollTrigger) {
      const scrub = trigger.getTween?.() ?? gsap.getTweensOf(trigger.animation)[0];
      if (scrub) scrub.pause();
      trigger.animation?.progress(trigger.progress);
    }

    stRef.current = ScrollTrigger.create({
      animation: gsap.fromTo(
        content,
        { y: 0 },
        {
          y: () => document.documentElement.clientHeight - height,
          ease: 'none',
          onUpdate: ScrollTrigger.update,
        }
      ),
      scroller: window,
      invalidateOnRefresh: true,
      start: 0,
      end: refreshHeight,
      refreshPriority: -999,
      scrub: smoothness,
      onUpdate(self) {
        if (isProxyScrolling) {
          killScrub(self);
          isProxyScrolling = false;
        }
      },
      onRefresh: killScrub,
    });

    ScrollTrigger.refresh();
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(t);
      stRef.current?.kill();
      ScrollTrigger.defaults({ scroller: window });
      document.body.style.height = '';
      gsap.set(viewport, { clearProps: 'all' });
      gsap.set(content, { clearProps: 'all' });
      ScrollTrigger.refresh();
    };
  }, [viewportRef, contentRef, smoothness]);
}
