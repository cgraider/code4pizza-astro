import { ArrowRight, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen pt-20 pb-6 md:pt-24 lg:pt-28 overflow-hidden bg-background bg-cover bg-center bg-no-repeat flex flex-col justify-center"
      style={{ backgroundImage: "url('/bg_3.jpg')" }}
    >
      {/* Overlay gradient — Adjusted for dark readable contrast */}
      <div className="absolute inset-0 bg-neutral-950/50 bg-gradient-to-b lg:bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-neutral-950/20 lg:to-transparent z-[1]" />

      {/* Content grid — Restored native container max-widths and responsive padding */}
      <div className="relative container grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center z-10 mt-6 lg:mt-0 py-4 lg:py-12">

        {/* Left — Copy */}
        <div className="relative flex flex-col justify-center min-w-0">
          <div className="relative z-10 appear">
            {/* Code-style greeting */}
            <div className="flex items-center gap-2 mb-2 lg:mb-4">
              <span className="font-mono text-xs sm:text-sm text-[var(--brand-yellow)]">{'// '}</span>
              <span className="font-mono text-xs sm:text-sm text-white/80">Hello, we&rsquo;re</span>
              <span className="hero-cursor inline-block w-[2px] h-3.5 sm:h-4 bg-[var(--brand-yellow)]" />
            </div>

            {/* Name with code syntax — Original bold layout sizing */}
            <h1 className="mb-2 lg:mb-4">
              <span className="font-mono text-primary text-xl md:text-2xl font-normal">const </span>
              <span className="font-mono text-[var(--brand-yellow)] text-xl md:text-2xl font-normal">partner</span>
              <span className="font-mono text-white/60 text-xl md:text-2xl font-normal"> = </span>
              <br />
              <span className="relative inline-block">
                <span className="relative text-white dark:text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">code4pizza</span>
              </span>
              <span className="font-mono text-white/60 text-2xl md:text-3xl">;</span>
            </h1>

            {/* Title */}
            <div className="mb-3 lg:mb-6">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-lead text-white font-semibold leading-snug">
                Building Software <span className="text-primary">That Grows</span>{' '}
                <span className="text-[var(--brand-yellow)] accent-glow-yellow">With You.</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-5 lg:mb-8 leading-relaxed max-w-xl">
              From dependable digital foundations to AI that actually works — we&rsquo;re your technical strategy partner, not just a dev shop.
            </p>

            {/* CTA Buttons — Compact padding on mobile with enhanced outline pop */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-6 lg:mb-10">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto px-6 lg:px-8 py-4.5 lg:py-6 text-sm sm:text-base flex items-center justify-center gap-2 group rounded-xl shadow-lg shadow-primary/20" asChild>
                <a href="#contacts">
                  Get In Touch
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              </Button>
              <Button
                variant="outline"
                className="px-6 lg:px-8 py-4.5 lg:py-6 text-sm sm:text-base flex items-center justify-center gap-2 group rounded-xl border-white/80 bg-white/5 hover:bg-white/10 text-white w-full sm:w-auto backdrop-blur-sm shadow-sm"
                asChild
              >
                <a href="#projects">
                  View Projects
                  <Code2 className="group-hover:rotate-12 transition-transform text-[var(--brand-yellow)]" size={18} />
                </a>
              </Button>
            </div>

            {/* Stats bar — Centered on mobile with full responsive bounds, clean desktop flush-left layout */}
            <div className="rounded-xl px-4 py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border border-white dark:border-white/10 shadow-lg shadow-black/20 flex flex-row items-center justify-center lg:justify-start gap-6 text-foreground dark:text-white w-full lg:w-fit mx-auto lg:mx-0">
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xl sm:text-2xl font-bold text-primary">8+</span>
                <span className="text-[10px] sm:text-xs text-foreground/80 dark:text-zinc-300 leading-none font-medium whitespace-nowrap">Years Exp</span>
              </div>

              <div className="w-px bg-border/40 dark:bg-white/10 h-6 shrink-0" />

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xl sm:text-2xl font-bold text-foreground dark:text-white">AI</span>
                <span className="text-[10px] sm:text-xs text-foreground/80 dark:text-zinc-300 leading-none font-medium whitespace-nowrap">First Approach</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right — Floating Terminal Card */}
        <div className="relative flex items-center justify-center lg:justify-end py-2 lg:py-0 z-10 w-full">
          <div className="w-full max-w-xl">
            <div className="rounded-xl border border-white/90 dark:border-zinc-800 overflow-hidden shadow-2xl shadow-black/30 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-xl text-foreground dark:text-zinc-100">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/60 dark:bg-zinc-900/60 border-b border-white/80 dark:border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/90" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/90" />
                </div>
                <span className="font-mono text-[11px] text-foreground/80 dark:text-zinc-400 ml-2 font-medium">code4pizza — terminal</span>
              </div>

              {/* Terminal body */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed">
                <p className="text-foreground/90 dark:text-zinc-200"><span className="text-[var(--brand-yellow)] font-bold">$</span> npx create-project</p>
                <p className="text-foreground/90 dark:text-zinc-200 mt-2 sm:mt-3"><span className="text-primary font-bold">✓</span> Frontend: <span className="text-foreground dark:text-zinc-300">React + TypeScript</span></p>
                <p className="text-foreground/90 dark:text-zinc-200 mt-1"><span className="text-primary font-bold">✓</span> Backend: <span className="text-foreground dark:text-zinc-300">Node.js + FastAPI</span></p>
                <p className="text-foreground/90 dark:text-zinc-200 mt-1"><span className="text-primary font-bold">✓</span> AI: <span className="text-foreground dark:text-zinc-300">Agentic AI + RAG</span></p>
                <p className="text-foreground/90 dark:text-zinc-200 mt-1"><span className="text-primary font-bold">✓</span> Deploy: <span className="text-foreground dark:text-zinc-300">Production ready</span></p>
                <p className="text-foreground/90 dark:text-zinc-200 mt-4 sm:mt-6"><span className="text-[var(--brand-yellow)] font-bold">$</span> <span className="text-foreground dark:text-white">Ready to ship.</span> <span className="hero-cursor inline-block w-[2px] h-3.5 sm:h-4 bg-[var(--brand-yellow)]" /></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}