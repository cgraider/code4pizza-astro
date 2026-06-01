import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Layers, Brain, Store, Shield, IterationCw, Link2, Gauge, Handshake,
  MessageCircle, Bot, Sparkles, Zap, LayoutGrid, Search, Box, ArrowRight,
  GraduationCap, Send, Globe, Workflow, Puzzle,
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

function ServiceTile({ item, index }: { item: { title: string; desc: string; icon: LucideIcon }; index: number }) {
  const Icon = item.icon;
  return (
    <div className="service-tile group relative p-5 rounded-xl bg-tile border border-tile-border transition-all duration-200 hover:border-tile-border-hover hover:bg-tile-hover">
      {/* Index number — faint background accent */}
      <span className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/25 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div className="w-8 h-8 rounded-lg icon-box flex items-center justify-center mb-4 transition-colors duration-200">
        <Icon className="w-4 h-4 icon-box-icon transition-colors duration-200" strokeWidth={1.75} />
      </div>

      <h4 className="text-sm font-semibold text-foreground tracking-tight mb-1.5 leading-snug">
        {item.title}
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {item.desc}
      </p>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof window !== 'undefined' && window.location.search.includes('export=1')) return;

    const ctx = gsap.context(() => {
      blockRefs.current.forEach((block) => {
        if (!block) return;
        const leftCol = block.querySelector('.svc-left-col');
        const tiles = block.querySelectorAll('.service-tile');

        if (leftCol) {
          gsap.fromTo(leftCol,
            { opacity: 0, y: 12 },
            {
              opacity: 1, y: 0, ease: 'power2.out',
              scrollTrigger: { trigger: block, start: 'top 88%', end: 'top 68%', scrub: 0.4 },
            });
        }

        if (tiles.length) {
          gsap.fromTo(tiles,
            { opacity: 0, y: 16 },
            {
              opacity: 1, y: 0, stagger: 0.045, ease: 'power2.out',
              scrollTrigger: { trigger: block, start: 'top 78%', end: 'top 48%', scrub: 0.4 },
            });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="services-section py-24 md:py-36 border-t border-section-border">
      <div className="container max-w-7xl px-6 mx-auto">

        {/* ── Section Header ── */}
        <header className="services-header mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-5">
            <span className="section-eyebrow">Our Core Capabilities</span>
            <span className="eyebrow-rule" aria-hidden />
          </div>
          <div className="services-header-grid">
            <h2 className="services-h2 text-foreground">
              What We Do
            </h2>
            <p className="services-intro text-muted-foreground">
              You&rsquo;re moving from &ldquo;hiring a coder&rdquo; to &ldquo;partnering with a technical
              strategy team.&rdquo; We architect systems built for performance, security, and long-term autonomy.
            </p>
          </div>
        </header>

        {/* ── Service Blocks ── */}
        <div className="space-y-20 md:space-y-28">
          {serviceBlocks.map((block, idx) => {
            const Icon = block.icon;
            return (
              <article
                key={idx}
                ref={(el) => { blockRefs.current[idx] = el; }}
                className="block-article grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-10"
              >
                {/* ── Left: sticky label column ── */}
                <div className="svc-left-col lg:col-span-4 lg:sticky lg:top-28 h-fit">
                  {/* Block meta row */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="block-index">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="block-index-rule" aria-hidden />
                    <span className="block-icon-wrap">
                      <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={2} aria-hidden />
                    </span>
                  </div>

                  <h3 className="block-title text-foreground mb-3">
                    {block.title}
                  </h3>
                  <p className="block-tagline text-muted-foreground">
                    {block.tagline}
                  </p>
                </div>

                {/* ── Right: tile grid ── */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {block.items.map((item, i) => (
                    <ServiceTile key={i} item={item} index={i} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Footer CTA ── */}
        <footer className="services-footer mt-28 md:mt-40 pt-16 border-t border-section-border">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-eyebrow mb-4 block">Let&rsquo;s Work Together</span>
            <h3 className="footer-cta-heading text-foreground mb-8">
              Ready to bring engineering-grade precision to your next stack?
            </h3>
            <Button size="lg" className="cta-button group inline-flex items-center gap-2 rounded-lg h-12 px-7 text-sm font-semibold" asChild>
              <a href="#contacts">
                Start a project
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
            </Button>
          </div>

          {/* ── Pull Quote ── */}
          <blockquote className="pull-quote mt-20 rounded-2xl text-left">
            <p className="pull-quote-text text-foreground">
              &ldquo;Let&rsquo;s build something great together.&rdquo;
            </p>
            <div className="pull-quote-body space-y-3 text-muted-foreground mt-4">
              <p>
                We are a team of researchers and engineers who have spent 8+ years building everything from
                national research platforms serving 100+ universities to AI tools that save professionals
                weeks of manual labor.
              </p>
              <p>
                We love solving hard problems, but we love seeing our friends succeed even more.
              </p>
            </div>
            <footer className="pull-quote-footer mt-8 pt-5 border-t border-quote-border flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden />
              <span className="text-xs font-mono text-muted-foreground font-medium">— The code4pizza team</span>
            </footer>
          </blockquote>
        </footer>

      </div>
    </section>
  );
}