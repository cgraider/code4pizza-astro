import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ByLawDemo = lazy(() => import('@/components/demos/ByLawDemo'));
const TravelBotDemo = lazy(() => import('@/components/demos/TravelBotDemo'));

type Category = 'all' | 'wordpress' | 'shopify' | 'ai' | 'xr' | 'webapp' | 'extension';

interface MediaItem { src: string; type: 'image' | 'video'; device?: 'desktop' | 'mobile' }

interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  categoryLabel: string;
  media: MediaItem[];
  demo?: 'bylaw' | 'travel';
  /** Accent color for the card — use a CSS custom property or a hex */
  accent: string;
  /** Short tech stack labels shown at the bottom of each card */
  stack: string[];
  layout?: 'full' | 'default';
}

const projects: Project[] = [
  {
    id: 'bylaw-ai', title: 'ByLaw AI',
    description: 'AI-powered construction permit assistant that validates form data against Canadian National Building Code in real time.',
    category: 'ai', categoryLabel: 'AI & Agents', demo: 'bylaw',
    media: [{ src: '/projects/bylaw/screenshot-1.png', type: 'image', device: 'mobile' }],
    accent: '#10b981',
    stack: ['LLM', 'RAG', 'React', 'FastAPI'],
  },
  {
    id: 'travel-bot', title: 'AI Travel Assistant',
    description: 'Agentic chatbot that joins group conversations, understands preferences, and suggests destinations with booking links.',
    category: 'ai', categoryLabel: 'AI & Agents', demo: 'travel',
    media: [],
    accent: '#8b5cf6',
    stack: ['Agents', 'NLP', 'Telegram', 'Node.js'],
  },
  {
    id: 'arvr-showcase', title: 'AR / VR Experiences',
    description: 'Augmented and virtual reality applications — from AR marker tracking to photorealistic architectural visualization in Unreal Engine 5.',
    category: 'xr', categoryLabel: 'XR / 3D', layout: 'full',
    media: [
      { src: '/projects/arvr/render-1.png', type: 'image', device: 'desktop' },
      { src: '/projects/arvr/render-2.png', type: 'image', device: 'desktop' },
      { src: '/projects/arvr/render-3.png', type: 'image', device: 'desktop' },
      { src: '/projects/arvr/render-4.png', type: 'image', device: 'desktop' },
      { src: '/projects/arvr/render-5.png', type: 'image', device: 'desktop' },
      { src: '/projects/arvr/avatar.jpg', type: 'image', device: 'desktop' },
      { src: '/projects/arvr/bic.jpg', type: 'image', device: 'desktop' },
      { src: '/projects/arvr/cycle.jpg', type: 'image', device: 'desktop' },
      { src: '/projects/arvr/tosan.jpg', type: 'image', device: 'desktop' },
      { src: '/projects/arvr/vr-demo.mp4', type: 'video' },
      { src: '/projects/arvr/ar-target-2.m4v', type: 'video' },
    ],
    accent: '#a855f7',
    stack: ['Unreal Engine 5', 'Unity', 'ARCore', 'WebGL'],
  },
  {
    id: 'shaderweb', title: 'ShaderWeb',
    description: 'WebGL-powered WordPress site featuring realtime 3D shader backgrounds and interactive visual effects.',
    category: 'wordpress', categoryLabel: 'WordPress',
    media: [
      { src: '/projects/shaderweb/desktop-1.png', type: 'image', device: 'desktop' },
      { src: '/projects/shaderweb/desktop-2.png', type: 'image', device: 'desktop' },
      { src: '/projects/shaderweb/mobile-1.png', type: 'image', device: 'mobile' },
      { src: '/projects/shaderweb/mobile-2.png', type: 'image', device: 'mobile' },
    ],
    accent: '#6366f1',
    stack: ['WordPress', 'GLSL', 'Three.js', 'PHP'],
  },
  {
    id: 'sponixtech', title: 'SponixTech',
    description: 'Corporate website for an AR/VR tech company — custom WordPress theme with immersive product showcases.',
    category: 'wordpress', categoryLabel: 'WordPress',
    media: [
      { src: '/projects/sponixtech/desktop-1.png', type: 'image', device: 'desktop' },
      { src: '/projects/sponixtech/desktop-2.png', type: 'image', device: 'desktop' },
      { src: '/projects/sponixtech/mobile-1.png', type: 'image', device: 'mobile' },
      { src: '/projects/sponixtech/mobile-2.png', type: 'image', device: 'mobile' },
      { src: '/projects/sponixtech/mobile-3.png', type: 'image', device: 'mobile' },
    ],
    accent: '#0ea5e9',
    stack: ['WordPress', 'ACF', 'GSAP', 'CSS'],
  },
  {
    id: 'jabeh', title: 'Jabeh',
    description: 'Shopify e-commerce store with custom theme, optimized checkout flow, and mobile-first design.',
    category: 'shopify', categoryLabel: 'Shopify',
    media: [
      { src: '/projects/jabeh/desktop-1.png', type: 'image', device: 'desktop' },
      { src: '/projects/jabeh/mobile-1.png', type: 'image', device: 'mobile' },
      { src: '/projects/jabeh/mobile-2.png', type: 'image', device: 'mobile' },
    ],
    accent: '#22c55e',
    stack: ['Shopify', 'Liquid', 'JavaScript', 'SEO'],
  },
  {
    id: 'ilia', title: 'ILIA',
    description: 'Bilingual WordPress site with custom plugin development, responsive design, and SEO optimization.',
    category: 'wordpress', categoryLabel: 'WordPress',
    media: [
      { src: '/projects/ilia/desktop-1.png', type: 'image', device: 'desktop' },
      { src: '/projects/ilia/desktop-2.png', type: 'image', device: 'desktop' },
      { src: '/projects/ilia/desktop-3.png', type: 'image', device: 'desktop' },
      { src: '/projects/ilia/mobile-1.png', type: 'image', device: 'mobile' },
      { src: '/projects/ilia/mobile-2.png', type: 'image', device: 'mobile' },
      { src: '/projects/ilia/mobile-3.png', type: 'image', device: 'mobile' },
    ],
    accent: '#f59e0b',
    stack: ['WordPress', 'i18n', 'Custom Plugin', 'Yoast'],
  },
  {
    id: 'digidealize', title: 'Digidealize',
    description: 'Digital agency portfolio built on WordPress with custom theme and interactive project showcases.',
    category: 'wordpress', categoryLabel: 'WordPress',
    media: [
      { src: '/projects/digidealize/desktop-1.png', type: 'image', device: 'desktop' },
      { src: '/projects/digidealize/desktop-2.png', type: 'image', device: 'desktop' },
      { src: '/projects/digidealize/mobile-1.png', type: 'image', device: 'mobile' },
      { src: '/projects/digidealize/mobile-2.png', type: 'image', device: 'mobile' },
    ],
    accent: '#f97316',
    stack: ['WordPress', 'Elementor', 'GSAP', 'PHP'],
  },
  {
    id: 'heatwellbeing', title: 'Heat Wellbeing',
    description: 'Health and wellness platform — WordPress site with appointment booking, blog, and membership features.',
    category: 'wordpress', categoryLabel: 'WordPress',
    media: [
      { src: '/projects/heatwellbeing/desktop-1.png', type: 'image', device: 'desktop' },
      { src: '/projects/heatwellbeing/desktop-2.png', type: 'image', device: 'desktop' },
      { src: '/projects/heatwellbeing/desktop-3.png', type: 'image', device: 'desktop' },
    ],
    accent: '#f43f5e',
    stack: ['WordPress', 'WooCommerce', 'Bookly', 'MemberPress'],
  },
  {
    id: 'heat-academy', title: 'Heat Academy',
    description: 'Custom LMS web application for continuing education — course management, progress tracking, certifications.',
    category: 'webapp', categoryLabel: 'Web App',
    media: [
      { src: '/projects/heat-academy/desktop-1.png', type: 'image', device: 'desktop' },
      { src: '/projects/heat-academy/desktop-2.png', type: 'image', device: 'desktop' },
      { src: '/projects/heat-academy/desktop-3.png', type: 'image', device: 'desktop' },
      { src: '/projects/heat-academy/desktop-4.png', type: 'image', device: 'desktop' },
    ],
    accent: '#38bdf8',
    stack: ['React', 'Node.js', 'PostgreSQL', 'LMS'],
  },
  {
    id: 'heat-extension', title: 'Heat Chrome Extension',
    description: 'Chrome extension for healthcare professionals — patient lookup, profile management, and data fetching from clinical systems.',
    category: 'extension', categoryLabel: 'Chrome Extension',
    media: [
      { src: '/projects/heat-extension/desktop-1.jpg', type: 'image', device: 'desktop' },
      { src: '/projects/heat-extension/desktop-2.jpg', type: 'image', device: 'desktop' },
      { src: '/projects/heat-extension/desktop-3.jpg', type: 'image', device: 'desktop' },
    ],
    accent: '#64748b',
    stack: ['Chrome API', 'React', 'TypeScript', 'REST'],
  },
];

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI' },
  { key: 'xr', label: 'XR / 3D' },
  { key: 'wordpress', label: 'WordPress' },
  { key: 'shopify', label: 'Shopify' },
  { key: 'webapp', label: 'Web Apps' },
  { key: 'extension', label: 'Extensions' },
];

const SLIDE_INTERVAL = 4500;

function useAutoSlide(length: number) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % length), SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [length]);
  return idx;
}

function CrossfadeStack({ items, className }: { items: MediaItem[]; className?: string }) {
  const idx = useAutoSlide(items.length);
  if (items.length === 0) return null;
  return (
    <div className={`relative w-full ${className ?? ''}`}>
      <img src={items[0].src} alt="" className="w-full block invisible" loading="lazy" />
      {items.map((item, i) => (
        <div key={item.src} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: i === idx ? 1 : 0 }}>
          <img src={item.src} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

/** Tinted frosted media area — accent color as a subtle tint */
function MediaDisplay({ media, accent }: { media: MediaItem[]; accent: string }) {
  const desktops = media.filter(m => m.device === 'desktop' && m.type === 'image');
  const mobiles = media.filter(m => m.device === 'mobile' && m.type === 'image');
  const videos = media.filter(m => m.type === 'video');
  const mainItems = [...desktops, ...videos];
  const dIdx = useAutoSlide(mainItems.length);

  const tintStyle = { backgroundColor: accent + '18' }; // ~10% opacity tint

  if (mainItems.length === 0 && mobiles.length === 0) {
    return <div className="h-60 md:h-72" style={tintStyle} />;
  }

  return (
    <div className="relative h-60 md:h-72 overflow-hidden" style={tintStyle}>
      {mainItems.length > 0 && (
        <>
          {mainItems.map((item, i) => (
            <div key={item.src} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: i === dIdx ? 1 : 0 }}>
              {item.type === 'video' ? (
                <video src={item.src} className="w-full h-full object-contain bg-black/80" autoPlay loop muted playsInline />
              ) : (
                <img src={item.src} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
              )}
            </div>
          ))}
          {/* Slide counter */}
          {mainItems.length > 1 && (
            <div className="absolute top-3 right-3 z-20 font-mono text-[10px] px-2 py-0.5 rounded bg-black/50 text-white/80 backdrop-blur-sm">
              {dIdx + 1} / {mainItems.length}
            </div>
          )}
        </>
      )}

      {/* Video badge */}
      {videos.length > 0 && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm text-white/80 text-[10px] font-mono">
          <Play className="w-2.5 h-2.5" /> {videos.length} video{videos.length > 1 ? 's' : ''}
        </div>
      )}

      {/* Mobile mockup peek */}
      {mobiles.length > 0 && (
        <div className="absolute bottom-0 right-5 z-10 w-[18%] max-w-[96px]" style={{ transform: 'translateY(6%)' }}>
          <CrossfadeStack items={mobiles} className="rounded-t-xl shadow-2xl shadow-black/40 overflow-hidden border border-white/20" />
        </div>
      )}

      {/* Dot indicators */}
      {mainItems.length > 1 && (
        <div className={`absolute bottom-3 z-20 flex gap-1.5 ${mobiles.length > 0 ? 'left-4' : 'left-1/2 -translate-x-1/2'}`}>
          {mainItems.map((_, i) => (
            <div key={i} className="h-1 rounded-full transition-all duration-300" style={{ width: i === dIdx ? 20 : 6, background: i === dIdx ? '#fff' : 'rgba(255,255,255,0.35)' }} />
          ))}
        </div>
      )}

      {/* Bottom gradient fade into card body */}
      <div className="absolute bottom-0 inset-x-0 h-12 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${accent}10)` }} />
    </div>
  );
}

/** Stack pill row */
function StackPills({ stack, accent }: { stack: string[]; accent: string }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-4">
      {stack.map(tag => (
        <span
          key={tag}
          className="text-[11px] font-mono px-2 py-0.5 rounded border"
          style={{ borderColor: accent + '40', color: accent, background: accent + '10' }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/** Standard project card */
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 bg-[var(--tile-bg)] border-[var(--tile-border)] hover:border-[var(--tile-border-hover)] hover:shadow-[var(--shadow-card)]">
      <MediaDisplay media={project.media} accent={project.accent} />

      <div className="flex flex-col flex-1 p-6">
        {/* Category + optional video badge */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded"
            style={{ color: project.accent, background: project.accent + '15' }}
          >
            {project.categoryLabel}
          </span>
          {project.media.some(m => m.type === 'video') && (
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)] flex items-center gap-1">
              <Play className="w-2.5 h-2.5" /> Video
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold tracking-tight text-foreground mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>

        <StackPills stack={project.stack} accent={project.accent} />
      </div>
    </div>
  );
}

/** Full-width ARVR card */
function ARVRSection({ project }: { project: Project }) {
  const images = project.media.filter(m => m.type === 'image');
  const videos = project.media.filter(m => m.type === 'video');
  const imgIdx = useAutoSlide(images.length);

  return (
    <div className="project-card col-span-1 md:col-span-2 rounded-2xl overflow-hidden border bg-[var(--tile-bg)] border-[var(--tile-border)] hover:border-[var(--tile-border-hover)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
      {/* Large image carousel */}
      <div className="relative h-72 md:h-[420px] overflow-hidden" style={{ background: project.accent + '18' }}>
        {images.map((img, i) => (
          <div key={img.src} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === imgIdx ? 1 : 0 }}>
            <img src={img.src} alt="" className="w-full h-full object-cover object-center" loading="lazy" />
          </div>
        ))}
        {images.length > 1 && (
          <>
            <div className="absolute top-3 right-3 z-10 font-mono text-[10px] px-2 py-0.5 rounded bg-black/50 text-white/80 backdrop-blur-sm">
              {imgIdx + 1} / {images.length}
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, i) => (
                <div key={i} className="h-1 rounded-full transition-all duration-300" style={{ width: i === imgIdx ? 20 : 6, background: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.35)' }} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Videos grid */}
      {videos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 p-4 border-t border-[var(--section-border)]">
          {videos.map(v => (
            <div key={v.src} className="relative rounded-xl overflow-hidden bg-black aspect-video">
              <video src={v.src} className="w-full h-full object-contain" autoPlay loop muted playsInline />
              <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-mono">
                <Play className="w-2.5 h-2.5" /> Video
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="p-6 flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1">
          <span
            className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-3 inline-block"
            style={{ color: project.accent, background: project.accent + '15' }}
          >
            {project.categoryLabel}
          </span>
          <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{project.description}</p>
          <StackPills stack={project.stack} accent={project.accent} />
        </div>
      </div>
    </div>
  );
}

/** Demo card (ByLaw / Travel) */
function DemoCard({ project }: { project: Project }) {
  const screenshotSrc = project.media.find(m => m.type === 'image')?.src;
  const Demo = project.demo === 'bylaw' ? ByLawDemo : TravelBotDemo;

  return (
    <div className="project-card group flex flex-col rounded-2xl overflow-hidden border bg-[var(--tile-bg)] border-[var(--tile-border)] hover:border-[var(--tile-border-hover)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
      {/* Demo stage */}
      <div
        className="relative flex items-end justify-center px-6 pt-8 pb-0 overflow-hidden"
        style={{ minHeight: 500, background: project.accent + '14' }}
      >
        {/* Ghost screenshot behind */}
        {screenshotSrc && (
          <div className="absolute z-0 opacity-30 pointer-events-none" style={{ width: 280, height: 400, left: '5%', bottom: 0, transform: 'translateY(10%) rotate(-6deg)' }}>
            <div className="w-full h-full rounded-[28px] overflow-hidden border-2 border-white/20 shadow-2xl shadow-black/30">
              <img src={screenshotSrc} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
            </div>
          </div>
        )}

        {/* Live demo */}
        <div className="relative z-10" style={{ width: 300, height: 420, transform: 'translateY(16px)' }}>
          <Suspense fallback={
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground font-mono">
              Loading demo…
            </div>
          }>
            <Demo />
          </Suspense>
        </div>
      </div>

      {/* Card info */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded"
            style={{ color: project.accent, background: project.accent + '15' }}
          >
            {project.categoryLabel}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ● Live Demo
          </span>
        </div>

        <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
        <StackPills stack={project.stack} accent={project.accent} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Category>('all');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof window !== 'undefined' && window.location.search.includes('export=1')) {
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, ease: 'power2.out', scrollTrigger: { trigger: headingRef.current, start: 'top 90%', end: 'top 60%', scrub: 0.4 } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Re-animate cards when filter changes */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' });
  }, [filter]);

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-background border-t border-[var(--section-border)] transition-colors duration-300">
      <div className="container">

        {/* ── Header ── */}
        <div ref={headingRef} className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="section-eyebrow">Projects</span>
            <span className="eyebrow-rule" aria-hidden />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Our Work</h2>
              <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                From AI-powered tools and national research platforms to WordPress sites, Shopify stores, and immersive XR experiences.
              </p>
            </div>
            {/* Project count badge */}
            <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--tile-bg)] border border-[var(--tile-border)]">
              <span className="font-mono text-2xl font-bold text-primary">{projects.length}</span>
              <span className="text-xs text-muted-foreground font-medium leading-tight">Projects<br />completed</span>
            </div>
          </div>
        </div>

        {/* ── Category filter bar ── */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects by category">
          {categories.map(c => {
            const count = c.key === 'all' ? projects.length : projects.filter(p => p.category === c.key).length;
            const active = filter === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                aria-pressed={active}
                className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${active
                    ? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-[var(--tile-bg)] border-[var(--tile-border)] text-muted-foreground hover:border-[var(--tile-border-hover)] hover:text-foreground'
                  }`}
              >
                {c.label}
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded transition-colors ${active ? 'bg-white/20 text-white' : 'bg-[var(--muted)] text-muted-foreground'
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Project grid ── */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(project => {
            if (project.layout === 'full') return <ARVRSection key={project.id} project={project} />;
            if (project.demo) return <DemoCard key={project.id} project={project} />;
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>

      </div>
    </section>
  );
}