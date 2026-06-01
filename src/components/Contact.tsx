import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Form Submission States
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

  // Formspree / Web3Forms Form Submission Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);

    // Injects Astro environment build variable securely on build time
    const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;
    if (accessKey) {
      formData.append("access_key", accessKey);
    }

    try {
      // Direct post to Web3Forms API endpoint (Or swap with your custom Formspree URL)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success || response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset(); // Clear form inputs on success
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contacts" ref={sectionRef} className="py-20 md:py-32 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={leftRef}>
            <p className="section-label mb-3 text-sm font-mono text-primary uppercase tracking-wider">Contact</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">START A PROJECT</h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Tell us what you're building. We'll get back quickly and work together to shape the right technical strategy—no corporate fluff, just a clear path forward.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-mono text-sm text-foreground/60 mb-1">Email</p>
                  <a href="mailto:info@code4pizza.com" className="text-foreground hover:text-primary transition-colors font-medium">
                    info@code4pizza.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-mono text-sm text-foreground/60 mb-1">We work globally</p>
                  <p className="text-foreground font-medium">Remote-first</p>
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
            <h3 className="text-2xl font-bold mb-6 tracking-tight">TELL US ABOUT YOUR PROJECT</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-foreground/70 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-foreground/70 mb-2">Email or Phone</label>
                <input
                  type="text"
                  name="contact_info"
                  required
                  placeholder="contact@example.com"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-foreground/70 mb-2">Project Details</label>
                <textarea
                  name="details"
                  required
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-mono flex items-center justify-center gap-2"
              >
                {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'submitting' ? 'Sending...' : 'Send Request'}
              </Button>

              {/* Status Message Handling */}
              {status === 'success' && (
                <p className="text-sm text-green-500 font-mono text-center animate-fade-in">✓ Message sent successfully! We'll reply soon.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-destructive font-mono text-center animate-fade-in">✕ Delivery failed. Please email us directly.</p>
              )}

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