import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Layers, Brain, Store, Shield, IterationCw, Link2, Gauge, Handshake,
  MessageCircle, Bot, Sparkles, Zap, LayoutGrid, Search, Box, ArrowRight,
  Webhook, GraduationCap, Send, Globe, Workflow, Puzzle,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface ServiceBlock {
  title: string;
  tagline: string;
  icon: LucideIcon;
  items: { title: string; desc: string; icon: LucideIcon }[];
}

const serviceBlocks: ServiceBlock[] = [
  {
    title: 'Building Software That Grows With You',
    tagline: "We don't just build apps; we build dependable digital foundations that evolve as your business does.",
    icon: Layers,
    items: [
      { title: 'Custom Blueprinting', desc: 'We design a technical map for your goals—fast, flexible, future-ready.', icon: LayoutGrid },
      { title: 'Security You Can Trust', desc: "Industry-best encryption and protection; we've built secure systems for healthcare and biotech.", icon: Shield },
      { title: 'Iterative Development', desc: 'Short, transparent sprints. You see progress every step so we refine together.', icon: IterationCw },
      { title: 'Unified Ecosystem', desc: 'We connect your APIs and systems into one seamless experience.', icon: Link2 },
      { title: 'Built for Speed', desc: "We optimize for maximum efficiency—honed through Ph.D. research in HPC.", icon: Gauge },
      { title: 'Long-Term Partner', desc: 'Ongoing support and updates so your software stays sharp and aligned.', icon: Handshake },
    ],
  },
  {
    title: 'AI That Actually Works For You',
    tagline: 'Move beyond the hype. We build intelligent tools that handle the heavy lifting.',
    icon: Brain,
    items: [
      { title: 'Talk to Your Data', desc: 'Turn PDFs, CSVs, and databases into a private "brain" you can chat with.', icon: MessageCircle },
      { title: 'Autonomous Agents', desc: 'Agentic AI that handles customer support, travel planning, legal validation—around the clock.', icon: Bot },
      { title: 'Modernize with Intelligence', desc: 'Integrate AI to automate risk assessments and uncover growth opportunities.', icon: Sparkles },
      { title: 'Rapid AI Deployment', desc: 'Pre-built enterprise frameworks get your custom AI solution live faster.', icon: Zap },
    ],
  },
  {
    title: 'Your Digital Storefront & Beyond',
    tagline: 'From first clicks to checkout—sites and stores that convert.',
    icon: Store,
    items: [
      { title: 'WordPress & Shopify', desc: 'Sites that are easy for you to manage and impossible for customers to forget.', icon: LayoutGrid },
      { title: 'Custom WordPress Plugins', desc: 'Tailored plugin development when no ready plugin fits—your site, your features, no compromise.', icon: Puzzle },
      { title: 'SEO That Delivers', desc: "Data-driven optimization so you're the first answer your customers see.", icon: Search },
    ],
  },
  {
    title: 'AR, VR & WebGL',
    tagline: 'Immersive experiences and 3D on the web—we build AR and VR applications and WebGL-based sites.',
    icon: Box,
    items: [
      { title: 'AR Applications', desc: 'Augmented reality experiences for product previews, try-before-you-buy, and in-context visualization.', icon: Box },
      { title: 'VR Applications', desc: 'Virtual reality apps and experiences for training, tours, and immersive storytelling.', icon: Layers },
      { title: 'WebGL-Based Websites', desc: 'High-performance 3D and interactive experiences in the browser—configurators, visualizations, realtime apps.', icon: Globe },
    ],
  },
  {
    title: 'Bots & Automation That Scale',
    tagline: 'We build bots and AI bots for messaging, scraping, and custom automation—so you focus on what matters.',
    icon: Bot,
    items: [
      { title: 'Telegram & Discord Bots', desc: 'Custom bots for communities, support, notifications, and workflows on Telegram and Discord.', icon: Send },
      { title: 'Web Scrapers & Data Bots', desc: 'Reliable scrapers and data-collection bots that feed your systems without manual work.', icon: Globe },
      { title: 'AI-Powered Bots', desc: 'Smart bots that understand context, answer questions, and automate conversations 24/7.', icon: MessageCircle },
      { title: 'Custom Automation Systems', desc: 'Tailored automation pipelines that connect your tools and eliminate repetitive tasks.', icon: Workflow },
    ],
  },
  {
    title: 'Custom LMS on Moodle',
    tagline: 'Avoid extra licensing costs and get a learning platform that fits your team—fully customizable and under your control.',
    icon: GraduationCap,
    items: [
      { title: 'Moodle-Based LMS', desc: 'Custom learning management systems built on Moodle—no per-seat vendor lock-in or surprise fees.', icon: GraduationCap },
      { title: 'Built for Your Team', desc: 'Courses, roles, and workflows designed around how your organization actually learns.', icon: Layers },
      { title: 'Full Customization', desc: 'Branding, integrations, and features tailored to your needs instead of one-size-fits-all SaaS.', icon: LayoutGrid },
    ],
  },
];

const pullQuote = "Let\u2019s build something great together.";

/** Per-section: brand (primary, yellow) + Our Work palette */
const serviceAccents = [
  { bg: '--background', bar: 'border-l-primary', icon: 'from-primary/15 to-[var(--brand-yellow)]/15', line: 'from-primary/50 to-[var(--brand-yellow)]/50' },
  { bg: 'bg-[var(--secondbackground)]', bar: 'border-l-[var(--brand-yellow)]', icon: 'from-[var(--brand-yellow)]/20 to-amber-100', line: 'from-amber-400 to-[var(--brand-yellow)]' },
  { bg: '--background', bar: 'border-l-emerald-500', icon: 'from-emerald-100 to-teal-100', line: 'from-emerald-300 to-teal-300' },
  { bg: 'bg-[var(--secondbackground)]', bar: 'border-l-violet-500', icon: 'from-violet-100 to-blue-100', line: 'from-violet-300 to-blue-300' },
  { bg: '--background', bar: 'border-l-indigo-500', icon: 'from-indigo-100 to-purple-100', line: 'from-indigo-300 to-purple-300' },
  { bg: 'bg-[var(--secondbackground)]', bar: 'border-l-primary', icon: 'from-primary/15 to-[var(--brand-yellow)]/15', line: 'from-primary/50 to-[var(--brand-yellow)]/50' },
];

/** Tile visual variants — each block uses a different one so you can compare. Pick one and we can use it for all. */
type TileVariant = 'a' | 'b' | 'c' | 'd';

function ServiceTile({
  item,
  index,
  variant,
  neumorphic = true,
}: {
  item: { title: string; desc: string; icon: LucideIcon };
  index: number;
  variant: TileVariant;
  neumorphic?: boolean;
}) {
  const Icon = item.icon;
  if (variant === 'a') {
    return (
      <div className="feature-tile group flex gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-xl border-2 border-white/80 hover:border-primary/40 shadow-lg shadow-black/5 hover:shadow-[var(--shadow-card)] transition-all duration-200">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors">
          <Icon className="w-6 h-6" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <strong className="text-foreground text-base font-semibold block mb-1">{item.title}</strong>
          <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
        </div>
      </div>
    );
  }
  if (variant === 'b') {
    return (
      <div className="feature-tile group flex gap-4 p-5 rounded-2xl bg-background border-l-4 border-l-primary shadow-[var(--shadow-card)] hover:border-l-[var(--brand-yellow)] transition-colors">
        <div className="shrink-0 w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="w-5 h-5" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <strong className="text-foreground text-base font-semibold block mb-1">{item.title}</strong>
          <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
        </div>
      </div>
    );
  }
  if (variant === 'c') {
    const shadowClass = neumorphic ? 'shadow-neumorphic' : 'shadow-[var(--shadow-card)]';
    return (
      <div className={`feature-tile group relative overflow-hidden rounded-2xl border border-border bg-background ${shadowClass} hover:border-primary/30 transition-all duration-200`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-[var(--brand-yellow)]/60" />
        <div className="p-5 pt-6 flex gap-4">
          <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <strong className="text-foreground text-base font-semibold block mb-1">{item.title}</strong>
            <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="feature-tile group p-5 rounded-2xl bg-muted/40 border border-border hover:bg-muted/60 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary ring-2 ring-primary/20 group-hover:ring-primary/30 transition-all">
          <Icon className="w-6 h-6" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <strong className="text-foreground text-base font-semibold block mb-1">{item.title}</strong>
          <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svcLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const verticalTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const setActiveRef = useRef(setActiveServiceIndex);
  const setProgressRef = useRef(setScrollProgress);
  setActiveRef.current = setActiveServiceIndex;
  setProgressRef.current = setScrollProgress;

  useEffect(() => {
    if (!sectionRef.current) return;

    const isExportMode = typeof window !== 'undefined' && window.location.search.includes('export=1');
    if (isExportMode) {
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
      blockRefs.current.forEach((el) => {
        if (!el) return;
        const textBlock = el.querySelector('.svc-text');
        const tiles = el.querySelectorAll('.feature-tile');
        const line = el.querySelector('.svc-line');
        if (textBlock) gsap.set(textBlock, { opacity: 1, x: 0 });
        if (tiles.length) gsap.set(tiles, { opacity: 1, y: 0 });
        if (line) gsap.set(line, { scaleX: 1 });
      });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 });
      if (quoteRef.current) gsap.set(quoteRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Heading: scrub fade-in
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, ease: 'none',
            scrollTrigger: { trigger: headingRef.current, start: 'top 90%', end: 'top 60%', scrub: 0.4 }
          });
      }

      blockRefs.current.forEach((el) => {
        if (!el) return;
        const textBlock = el.querySelector('.svc-text');
        const tiles = el.querySelectorAll('.feature-tile');
        const line = el.querySelector('.svc-line');

        // Text block slides in from left
        if (textBlock) {
          gsap.fromTo(textBlock,
            { opacity: 0, x: -30 },
            {
              opacity: 1, x: 0, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 45%', scrub: 0.5 }
            });
        }

        // Feature tiles stagger up
        if (tiles.length) {
          gsap.fromTo(tiles,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, stagger: 0.04, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 30%', scrub: 0.5 }
            });
        }

        // Separator line scales in
        if (line) {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 70%', end: 'top 40%', scrub: 0.5 }
            });
        }
      });

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, ease: 'none',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', end: 'top 65%', scrub: 0.4 }
          });
      }

      // Quote
      if (quoteRef.current) {
        gsap.fromTo(quoteRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, ease: 'none',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 90%', end: 'top 55%', scrub: 0.5 }
          });
      }

      // Timeline: line length = scroll progress; smoother fill with higher scrub
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
          onUpdate: (self) => {
            setProgressRef.current(self.progress);
          },
        });
      }

      // Update sidetext label when each service block is in view
      blockRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 58%',
          end: 'top 42%',
          onEnter: () => setActiveRef.current(i),
          onEnterBack: () => setActiveRef.current(i),
        });
      });

      // Vertical text: cipher-style reveal tied to scroll (scrambled characters resolving into the label)
      const setupVerticalText = () => {
        verticalTextRefs.current.forEach((el, i) => {
          if (!el) return;
          const block = blockRefs.current[i];
          if (!block) return;
          const original = (el.dataset.originalText ?? el.textContent ?? '').trim();
          if (!original) return;
          el.dataset.originalText = original;

          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          const state = { progress: 0 };

          gsap.set(el, { opacity: 0, y: 12 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.6,
            },
          });

          tl.to(el, { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, 0);

          tl.to(state, {
            progress: 1,
            duration: 0.9,
            ease: 'none',
            onUpdate: () => {
              const len = original.length;
              const revealed = Math.floor(len * state.progress);
              let out = '';
              for (let idx = 0; idx < len; idx++) {
                const ch = original[idx];
                if (ch === ' ' || ch === '–' || idx < revealed) {
                  out += ch;
                } else {
                  out += chars[Math.floor(Math.random() * chars.length)];
                }
              }
              el.textContent = out;
            },
          }, 0);
        });
      };
      // Defer to the next frame so refs are populated
      requestAnimationFrame(() => requestAnimationFrame(setupVerticalText));
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-x-hidden overflow-y-visible"
    >
      {/* Timeline: inside container so it aligns with content */}
      <div className="absolute inset-0 pointer-events-none hidden md:block z-10">
        <div className="container relative h-full">
          <div
            className="services-timeline absolute left-0 top-0 bottom-0 w-20 lg:w-24 pt-2 pb-4 overflow-visible"
            aria-hidden
          >
            <div className="relative w-full h-full flex justify-center overflow-visible">
              {/* Track: thicker line, gradient (primary → brand-yellow), full height so nothing cuts at start */}
              <div
                className="relative w-1 h-full min-h-full overflow-visible rounded-full shrink-0"
                style={{
                  background:
                    'linear-gradient(to bottom, color-mix(in srgb, var(--primary) 18%, transparent), color-mix(in srgb, var(--primary) 8%, transparent), color-mix(in srgb, var(--brand-yellow) 12%, transparent))',
                }}
              >
                {/* Filled line: thicker, same gradient palette (primary → brand-yellow); grows/shrinks with scroll */}
                <div
                  ref={lineFillRef}
                  className="absolute left-0 top-0 w-full origin-top rounded-full"
                  style={{
                    height: `${scrollProgress * 100}%`,
                    minHeight: 0,
                    background:
                      'linear-gradient(to bottom, var(--primary), color-mix(in srgb, var(--primary) 85%, var(--brand-yellow)), color-mix(in srgb, var(--primary) 60%, var(--brand-yellow)))',
                  }}
                />
                {/* Vein at each block: fills right at the moment vertical fill reaches intersection; same gradient */}
                {(() => {
                  const sectionEl = sectionRef.current;
                  if (!sectionEl) return null;
                  const sectionHeight = sectionEl.offsetHeight;
                  if (sectionHeight <= 0) return null;
                  const veinFillBand = 36;
                  return blockRefs.current.map((el, i) => {
                    const block = el;
                    const lineEl = svcLineRefs.current[i];
                    const veinTop =
                      block && lineEl
                        ? block.offsetTop + lineEl.offsetTop + lineEl.offsetHeight / 2
                        : (block?.offsetTop ?? 0) + 80;
                    const fillPosition = scrollProgress * sectionHeight;
                    const veinFillProgress = Math.min(
                      1,
                      Math.max(0, (fillPosition - veinTop + veinFillBand) / (veinFillBand * 2)),
                    );
                    const isActive = activeServiceIndex === i;
                    const num = String(i + 1).padStart(2, '0');
                    return (
                      <div
                        key={i}
                        className="absolute left-0 flex items-center -translate-y-1/2"
                        style={{ top: `${(veinTop / sectionHeight) * 100}%` }}
                      >
                        {/* Vein: fills when vertical reaches intersection; same gradient as vertical (primary → brand-yellow) */}
                        <div className="h-[3px] w-[2.75rem] origin-left overflow-hidden rounded-full">
                          <div
                            className="h-full rounded-full origin-left"
                            style={{
                              width: `${veinFillProgress * 100}%`,
                              minWidth: 0,
                              background:
                                'linear-gradient(to right, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--brand-yellow)))',
                            }}
                          />
                        </div>
                        <div
                          ref={(el) => {
                            verticalTextRefs.current[i] = el;
                          }}
                          className="absolute left-full ml-3 pb-1.5 text-primary font-semibold text-[11px] uppercase tracking-widest whitespace-nowrap"
                          style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            transform: 'rotate(180deg)',
                            maxHeight: '80px',
                            lineHeight: 1.3,
                            opacity: isActive ? 1 : 0.4,
                          }}
                        >
                          <span className="text-primary/70">{num}</span>
                          <span className="ml-1">{serviceBlocks[i]?.title ?? ''}</span>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service blocks — full-width alternating background; heading shares first block */}
      {serviceBlocks.map((block, idx) => {
        const Icon = block.icon;
        const { bg, bar, icon: iconGrad, line: lineGrad } = serviceAccents[idx] ?? { bg: 'bg-white', bar: 'border-l-primary', icon: 'from-primary/10 to-[var(--brand-yellow)]/10', line: 'from-primary/40 to-[var(--brand-yellow)]/40' };
        const useNeumorphicTiles = bg === 'bg-white';
        return (
          <div
            key={idx}
            ref={(el) => { blockRefs.current[idx] = el; }}
            className={`relative py-20 md:py-32 w-full border-l-[6px] ${bg} ${bar}`}
          >
            <div className="container">
              {idx === 0 && (
                <div ref={headingRef} className="mb-20 md:mb-28 appear md:pl-20 lg:pl-24">
                  <p className="section-label mb-3">Services</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-5">WHAT WE DO</h2>
                  <p className="text-lead text-foreground/80 max-w-2xl leading-[1.45]">
                    You&rsquo;re moving from &ldquo;hiring a coder&rdquo; to &ldquo;partnering with a technical strategy team.&rdquo;
                  </p>
                </div>
              )}
              {/* Animated separator line — uses section accent color */}
              <div
                ref={(el) => { svcLineRefs.current[idx] = el; }}
                className={`svc-line h-[3px] mb-10 origin-left rounded-full md:ml-20 lg:ml-24 bg-gradient-to-r ${lineGrad}`}
              />

              {/* Number + header — icon uses Our Work gradient */}
              <div className="svc-text flex flex-col md:flex-row md:items-start gap-8 md:gap-16 mb-12 md:pl-20 lg:pl-24">
                <div className="shrink-0 flex items-center gap-4">
                  <span className="font-mono text-sm text-primary/50 font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-primary bg-gradient-to-br ${iconGrad}`}>
                    <Icon className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                </div>
                <div className="max-w-lg">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">{block.title}</h3>
                  <p className="text-foreground/70 text-base leading-relaxed">{block.tagline}</p>
                </div>
              </div>

              {/* Feature tiles — balanced grid, room for timeline on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:pl-20 lg:pl-24">
                {block.items.map((item, i) => (
                  <ServiceTile key={i} item={item} index={i} variant="c" neumorphic={useNeumorphicTiles} />
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* CTA + Quote — full-width strip (aligned with portfolio) */}
      <div className="border-t border-border/60 bg-gradient-to-b from-[#0b1020] via-[#111827] to-[#020617] py-20 md:py-32">
        <div className="container max-w-4xl">
          <div ref={ctaRef} className="text-center">
            <p className="section-label mb-3 text-[var(--brand-yellow)]/80">Get in touch</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to build something great?</h3>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg flex items-center gap-2 group rounded-xl mx-auto shadow-[0_18px_45px_rgba(0,0,0,0.55)]" asChild>
              <a href="#contacts">
                Start a project
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </Button>
          </div>
          <blockquote ref={quoteRef} className="mt-16 md:mt-24 p-8 md:p-12 rounded-2xl bg-white/5 border border-white/10 shadow-[0_22px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl text-center max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-white mb-5">&ldquo;{pullQuote}&rdquo;</p>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed">
              We are a team of researchers and engineers who have spent 8+ years building everything from national research platforms serving 100+ universities to AI tools that save professionals weeks of manual labor.
            </p>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed mt-3">
              We love solving hard problems, but we love seeing our friends succeed even more.
            </p>
            <footer className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-300 font-mono">
              <span className="w-1 h-4 rounded-full bg-[var(--brand-yellow)] shadow-[0_0_18px_rgba(245,158,11,0.9)]" aria-hidden />
              — The code4pizza team
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
