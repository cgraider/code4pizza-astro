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
          { opacity: 0, x: 30 }, // Positive translation vector for RTL slide-in animation flow
          {
            opacity: 1, x: 0, ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 45%', scrub: 0.5 }
          });
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current,
          { opacity: 0, x: -30 }, // Negative translation vector for RTL slide-in animation flow
          {
            opacity: 1, x: 0, ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 40%', scrub: 0.5 }
          });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;
    if (accessKey) {
      formData.append("access_key", accessKey);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success || response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contacts" ref={sectionRef} className="py-20 md:py-32 bg-card border-t border-border text-right">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Info Side Area */}
          <div ref={leftRef}>
            <p className="section-label mb-3 text-sm font-mono text-primary uppercase tracking-wider">ارتباط با ما</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">آغاز یک پروژه جدید</h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              از آنچه در ذهن دارید و می‌خواهید بسازید بگویید. ما به‌سرعت پاسخ می‌دهیم تا استراتژی فنی مناسب را با هم شکل دهیم؛ بدون تعارفات اداری، فقط یک مسیر روشن برای حرکت به جلو.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-foreground/60 mb-1">پست الکترونیکی</p>
                  <a href="mailto:info@code4pizza.com" className="text-foreground hover:text-primary transition-colors font-medium font-mono">
                    info@code4pizza.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-foreground/60 mb-1">محدوده فعالیت</p>
                  <p className="text-foreground font-medium">همکاری بین‌المللی — ریموت‌فرست</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a href="#services" className="block text-foreground/70 hover:text-primary transition-colors text-sm">
                ← خدمات و توانمندی‌ها
              </a>
              <a href="#projects" className="block text-foreground/70 hover:text-primary transition-colors text-sm">
                ← نمونه کارهای ما
              </a>
            </div>
          </div>

          {/* Interactive Input Card Container */}
          <div ref={rightRef} className="bg-background rounded-lg p-8 border border-border shadow-neumorphic">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">مشخصات پروژه خود را بنویسید</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-foreground/70 mb-2">نام شما</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="مثال: علی علوی"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-2">ایمیل یا شماره تماس</label>
                <input
                  type="text"
                  name="contact_info"
                  required
                  placeholder="contact@example.com"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors text-left font-mono"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-2">جزئیات ایده و پروژه</label>
                <textarea
                  name="details"
                  required
                  placeholder="توضیحاتی درباره اهداف، ابعاد و نیازمندی‌های سیستم خود بنویسید..."
                  rows={5}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 flex items-center justify-center gap-2 rounded-lg font-medium"
              >
                {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'submitting' ? 'در حال ارسال پیام...' : 'ارسال درخواست'}
              </Button>

              {/* Status Handler Popups */}
              {status === 'success' && (
                <p className="text-sm text-green-600 font-medium text-center animate-fade-in">✓ پیام با موفقیت ارسال شد! به‌زودی با شما تماس می‌گیریم.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-destructive font-medium text-center animate-fade-in">✕ خطا در ارسال. لطفاً مستقیماً به ایمیل ما پیام بفرستید.</p>
              )}

              <p className="text-xs text-foreground/50 text-center">
                با ارسال این فرم، شما با{' '}
                <a href="#about" className="text-primary hover:underline">حریم خصوصی</a> تیم ما موافقت می‌کنید.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}