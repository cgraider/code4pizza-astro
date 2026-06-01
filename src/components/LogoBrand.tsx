import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const brandColors = {
  outer: '#f59e0b',
  mid: '#dc2626',
  inner: '#991b1b',
  center: '#d97706',
};

interface LogoBrandProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export default function LogoBrand({ className = '', size = 40, animate = true }: LogoBrandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<SVGPathElement>(null);
  const midRef = useRef<SVGPathElement>(null);
  const innerRef = useRef<SVGPathElement>(null);
  const centerRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!animate || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (clipRef.current) {
        tl.fromTo(
          clipRef.current,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(75% at 50% 50%)', duration: 0.6 }
        );
      }

      const rings = [centerRef.current, innerRef.current, midRef.current, outerRef.current].filter(Boolean);
      tl.fromTo(
        rings,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.2)',
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <div ref={containerRef} className={className} style={{ width: size, height: size }}>
      <div
        ref={clipRef}
        className="overflow-hidden"
        style={{
          clipPath: animate ? 'circle(0% at 50% 50%)' : 'circle(75% at 50% 50%)',
          width: '100%',
          height: '100%',
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            ref={outerRef}
            fill={brandColors.outer}
            d="M196.5,100c0,52.2-42.3,94.5-94.5,94.5-52.2,0-94.5-42.3-94.5-94.5,0-52.2,42.3-94.5,94.5-94.5,25.1,0,49.1,9.9,66.8,27.7l-17,17c-27.5-27.5-72-27.5-99.5,0-27.5,27.5-27.5,72,0,99.5,27.5,27.5,72,27.5,99.5,0,13.2-13.2,20.6-31.1,20.6-49.7h24.1Z"
          />
          <path
            ref={midRef}
            fill={brandColors.mid}
            d="M166.4,100c0,35.5-28.8,64.3-64.3,64.3-35.5,0-64.3-28.8-64.3-64.3,0-35.5,28.8-64.3,64.3-64.3,17.1,0,33.4,6.8,45.5,18.8l-17.1,17.1c-15.7-15.7-41.2-15.7-56.9,0-15.7,15.7-15.7,41.2,0,56.9,15.7,15.7,41.2,15.7,56.9,0,7.5-7.5,11.8-17.8,11.8-28.4h24.1Z"
          />
          <path
            ref={innerRef}
            fill={brandColors.inner}
            d="M138.2,100c0,20-16.2,36.2-36.2,36.2-20,0-36.2-16.2-36.2-36.2,0-20,16.2-36.2,36.2-36.2,9.6,0,18.8,3.8,25.6,10.6l-11.4,11.4c-7.9-7.8-20.6-7.8-28.4,0-7.8,7.9-7.8,20.6,0,28.4,7.9,7.8,20.6,7.8,28.4,0,3.8-3.8,5.9-8.9,5.9-14.2h16.1Z"
          />
          <circle ref={centerRef} fill={brandColors.center} cx="102.1" cy="100" r="20.1" />
        </svg>
      </div>
    </div>
  );
}
