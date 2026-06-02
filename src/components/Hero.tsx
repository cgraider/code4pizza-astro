import { ArrowLeft, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen pt-20 pb-6 md:pt-24 lg:pt-28 overflow-hidden bg-background bg-cover bg-center bg-no-repeat flex flex-col justify-center text-right"
      style={{ backgroundImage: "url('/bg_3.jpg')" }}
    >
      {/* Dynamic Background Gradient - Flipped to support LTR-to-RTL linear color density mapping */}
      <div className="absolute inset-0 bg-neutral-950/50 bg-gradient-to-b lg:bg-gradient-to-l from-neutral-950/90 via-neutral-950/50 to-neutral-950/20 lg:to-transparent z-[1]" />

      {/* Main Grid Layout */}
      <div className="relative container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10 mt-6 lg:mt-0 py-4 lg:py-12">

        {/* ── Right Column — Translated Copy ── */}
        <div className="relative flex flex-col justify-center min-w-0 z-10 appear">
          <div>
            <div className="flex items-center gap-2 mb-2 lg:mb-4">
              <span className="font-mono text-xs sm:text-sm text-[var(--brand-yellow)]">{'// '}</span>
              <span className="text-xs sm:text-sm text-white/80">سلام، ما</span>
              <span className="hero-cursor inline-block w-[2px] h-3.5 sm:h-4 bg-[var(--brand-yellow)]" />
            </div>

            <h1 className="mb-2 lg:mb-4 leading-tight">
              <span className="font-mono text-primary text-xl md:text-2xl font-normal">const </span>
              <span className="font-mono text-[var(--brand-yellow)] text-xl md:text-2xl font-normal">partner</span>
              <span className="font-mono text-white/60 text-xl md:text-2xl font-normal"> = </span>
              <br />
              <span className="relative inline-block">
                <span className="relative text-white dark:text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">code4pizza</span>
              </span>
              <span className="font-mono text-white/60 text-2xl md:text-3xl">;</span>
            </h1>

            <div className="mb-3 lg:mb-6">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-lead text-white font-semibold leading-snug">
                توسعه نرم‌افزاری <span className="text-primary">که با شما</span>{' '}
                <span className="text-[var(--brand-yellow)] accent-glow-yellow">رشد می‌کند.</span>
              </p>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-5 lg:mb-8 leading-relaxed max-w-xl">
              از زیرساخت‌های دیجیتال قابل اعتماد تا هوش مصنوعی کاربردی و واقعی؛ ما شریک استراتژی فنی شما هستیم، نه فقط یک تیم برنامه‌نویسی ساده.
            </p>

            {/* Action Buttons Cluster - Directional arrow flipped to ArrowLeft for Persian reading flow */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-6 lg:mb-10">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto px-6 lg:px-8 py-4.5 lg:py-6 text-sm sm:text-base flex items-center justify-center gap-2 group rounded-xl shadow-lg shadow-primary/20" asChild>
                <a href="#contacts">
                  با ما بگو‌گوئید
                  <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
                </a>
              </Button>
              <Button
                variant="outline"
                className="px-6 lg:px-8 py-4.5 lg:py-6 text-sm sm:text-base flex items-center justify-center gap-2 group rounded-xl border-white/80 bg-white/5 hover:bg-white/10 text-white w-full sm:w-auto backdrop-blur-sm shadow-sm"
                asChild
              >
                <a href="#projects">
                  مشاهده پروژه‌ها
                  <Code2 className="group-hover:rotate-12 transition-transform text-[var(--brand-yellow)]" size={18} />
                </a>
              </Button>
            </div>

            {/* Localized Metrics Pills */}
            <div className="rounded-xl px-4 py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border border-white dark:border-white/10 shadow-lg shadow-black/20 flex flex-row items-center justify-center lg:justify-start gap-6 text-foreground dark:text-white w-full lg:w-fit mx-auto lg:mx-0">
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xl sm:text-2xl font-bold text-primary">+۸</span>
                <span className="text-[10px] sm:text-xs text-foreground/80 dark:text-zinc-300 leading-none font-medium whitespace-nowrap">سال تجربه</span>
              </div>
              <div className="w-px bg-border/40 dark:bg-white/10 h-6 shrink-0" />
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xl sm:text-2xl font-bold text-foreground dark:text-white">AI</span>
                <span className="text-[10px] sm:text-xs text-foreground/80 dark:text-zinc-300 leading-none font-medium whitespace-nowrap">رویکرد اولویت هوش مصنوعی</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Left Column — LTR Syntax Terminal (Flipped spatial positioning coordinates smoothly) ── */}
        <div className="relative hidden lg:flex items-center justify-start py-2 lg:py-0 z-10 w-full">
          <div className="relative w-full max-w-[480px]">

            {/* Terminal Card Frame */}
            <div className="hero-scale-in rounded-2xl overflow-hidden border border-white/15 bg-neutral-950/80 backdrop-blur-xl shadow-2xl shadow-black/40" style={{ animationDelay: '100ms' }}>

              {/* LTR Native Control Strip */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10" style={{ direction: 'ltr' }}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="font-mono text-[11px] text-white/30 ml-2">~/code4pizza</span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/80 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  live
                </span>
              </div>

              {/* LTR Syntax Body Container */}
              <div className="p-5 font-mono text-[13px] leading-7 space-y-0.5" style={{ direction: 'ltr' }}>
                <p className="text-white/40"><span className="text-[var(--brand-yellow)]">❯</span> npx create-project <span className="text-white/20">--type=full-stack</span></p>
                <p className="text-white/20 text-xs pt-1">── initializing stack ──────────────────</p>

                <div className="space-y-1 py-1">
                  {[
                    { label: 'Frontend', value: 'React + TypeScript', color: 'text-sky-400' },
                    { label: 'Backend', value: 'Node.js + FastAPI', color: 'text-violet-400' },
                    { label: 'AI Layer', value: 'Agentic AI + RAG', color: 'text-[var(--brand-yellow)]' },
                    { label: 'Deploy', value: 'Production ready', color: 'text-emerald-400' },
                  ].map(({ label, value, color }) => (
                    <p key={label} className="text-white/70">
                      <span className="text-primary font-bold">✓</span>{' '}
                      <span className="text-white/35">{label}:</span>{' '}
                      <span className={color}>{value}</span>
                    </p>
                  ))}
                </div>

                <p className="text-white/20 text-xs">────────────────────────────────────────</p>
                <p className="text-white pt-1">
                  <span className="text-[var(--brand-yellow)]">❯</span>{' '}
                  <span className="text-white/60">status:</span>{' '}
                  <span className="text-emerald-400 font-semibold">ready to ship.</span>{' '}
                  <span className="hero-cursor inline-block w-[2px] h-[13px] bg-[var(--brand-yellow)] align-middle" />
                </p>
              </div>
            </div>

            {/* Inverted Floating Metric Pill - Anchored to Top-Left corner for natural balance */}
            <div
              className="hero-pop-in absolute -top-4 -left-4 flex items-center gap-3 rounded-xl px-4 py-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-xl shadow-black/25 badge-float"
              style={{ animationDelay: '600ms' }}
            >
              <div className="text-center">
                <p className="font-mono text-2xl font-bold text-primary leading-none">+۱۰</p>
                <p className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 mt-0.5 uppercase tracking-wide">پروژه موفق</p>
              </div>
              <div className="w-px bg-neutral-200 dark:bg-white/10 h-8" />
              <div className="text-center">
                <p className="font-mono text-2xl font-bold text-[var(--brand-yellow)] leading-none">+۸</p>
                <p className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 mt-0.5 uppercase tracking-wide">سال سابقه</p>
              </div>
            </div>

            {/* Inverted Service Tag Strip - Bottom Right Corner layout flow */}
            <div
              className="hero-fade-in absolute -bottom-5 -right-4 rounded-xl px-4 py-3 bg-neutral-950/90 backdrop-blur-md border border-white/10 shadow-xl shadow-black/30 badge-float"
              style={{ animationDelay: '800ms', animationDuration: '4s' }}
            >
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2 text-right">تخصص‌های ما</p>
              <div className="flex items-center gap-2 flex-wrap justify-start" style={{ direction: 'rtl' }}>
                {['عامل‌های هوش مصنوعی', 'وب اپلیکیشن‌ها', 'واقعیت افزوده / مجازی', 'اتوماسیون تخصصی'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/8 border border-white/10 text-white/75 whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating AI Left Badge System */}
            <div
              className="hero-pop-in absolute top-1/2 -translate-y-1/2 -left-14 rounded-xl p-3 bg-[var(--primary)] shadow-xl shadow-primary/30 badge-float"
              style={{ animationDelay: '1000ms', animationDuration: '5s' }}
            >
              <div className="text-center font-mono">
                <p className="text-[11px] font-bold text-white/90 uppercase tracking-wide">AI</p>
                <p className="text-[10px] text-white/50 mt-0.5">First</p>
              </div>
            </div>

          </div>
        </div>

        {/* ── Mobile View Fallback Terminal Structure ── */}
        <div className="lg:hidden w-full max-w-xl mx-auto hero-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="rounded-xl overflow-hidden border border-white/15 bg-neutral-950/80 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10" style={{ direction: 'ltr' }}>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/70" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                <div className="w-2 h-2 rounded-full bg-green-500/70" />
              </div>
              <span className="font-mono text-[10px] text-white/30 ml-1">~/code4pizza</span>
              <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-emerald-400/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />live
              </span>
            </div>
            <div className="p-4 font-mono text-xs leading-7 space-y-0.5" style={{ direction: 'ltr' }}>
              <p className="text-white/40"><span className="text-[var(--brand-yellow)]">❯</span> npx create-project</p>
              {[
                { label: 'Frontend', value: 'React + TypeScript', color: 'text-sky-400' },
                { label: 'AI Layer', value: 'Agentic AI + RAG', color: 'text-[var(--brand-yellow)]' },
                { label: 'Deploy', value: 'Production ready', color: 'text-emerald-400' },
              ].map(({ label, value, color }) => (
                <p key={label} className="text-white/70">
                  <span className="text-primary font-bold">✓</span> Gentile{' '}
                  <span className="text-white/35">{label}:</span>{' '}
                  <span className={color}>{value}</span>
                </p>
              ))}
              <p className="text-white pt-1">
                <span className="text-[var(--brand-yellow)]">❯</span>{' '}
                <span className="text-emerald-400">ready to ship.</span>{' '}
                <span className="hero-cursor inline-block w-[2px] h-3.5 bg-[var(--brand-yellow)] align-middle" />
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator footer tag */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">اسکرول</span>
      </div>
    </section>
  );
}