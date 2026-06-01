import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const isExportMode = typeof window !== 'undefined' && window.location.search.includes('export=1');
    if (isExportMode) {
      if (leftRef.current) gsap.set(leftRef.current, { opacity: 1, x: 0 });
      if (rightRef.current) gsap.set(rightRef.current, { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(leftRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 45%', scrub: 0.5 }
          });
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0, ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 40%', scrub: 0.5 }
          });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contacts" ref={sectionRef} className="py-20 md:py-32 bg-card border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={leftRef}>
            <p className="section-label mb-3">Contact</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">START A PROJECT</h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Tell us what you're building. We'll get back quickly and work together to shape the right technical strategy—no corporate fluff, just a clear path forward.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-mono text-sm text-foreground/60 mb-1">Email</p>
                  <a href="mailto:info@code4pizza.com" className="text-foreground hover:text-primary transition-colors">
                    info@code4pizza.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-mono text-sm text-foreground/60 mb-1">We work globally</p>
                  <p className="text-foreground">Remote-first</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a href="#services" className="block text-foreground/70 hover:text-primary transition-colors font-mono text-sm">
                &rarr; What we do
              </a>
              <a href="#projects" className="block text-foreground/70 hover:text-primary transition-colors font-mono text-sm">
                &rarr; Our work
              </a>
            </div>
          </div>

          <div ref={rightRef} className="bg-background rounded-lg p-8 border border-border shadow-neumorphic">
            <h3 className="text-2xl font-bold mb-6">TELL US ABOUT YOUR PROJECT</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-foreground/70 mb-2">Name</label>
                <input type="text" placeholder="Your name"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-mono text-foreground/70 mb-2">Email or Phone</label>
                <input type="text" placeholder="contact@example.com"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-mono text-foreground/70 mb-2">Project Details</label>
                <textarea placeholder="Tell us about your project..." rows={5}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-mono">
                Send Request
              </Button>
              <p className="text-xs text-foreground/50 text-center">
                By submitting this form, you agree to our{' '}
                <a href="#about" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
