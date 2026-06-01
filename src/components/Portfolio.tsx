import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ByLawDemo = lazy(() => import('@/components/demos/ByLawDemo'));
const TravelBotDemo = lazy(() => import('@/components/demos/TravelBotDemo'));

type Category = 'all' | 'wordpress' | 'shopify' | 'ai' | 'xr' | 'webapp' | 'extension';

interface MediaItem { src: string; type: 'image' | 'video'; device?: 'desktop' | 'mobile' }

interface Project {
  id: string; title: string; description: string;
  category: Category; categoryLabel: string;
  media: MediaItem[];
  demo?: 'bylaw' | 'travel';
  color: string;
  darkColor: string; // Added to handle rich dark gradients safely
  layout?: 'full' | 'default';
}

const projects: Project[] = [
  {
    id: 'bylaw-ai', title: 'ByLaw AI',
    description: 'AI-powered construction permit assistant that validates form data against Canadian National Building Code in real time.',
    category: 'ai', categoryLabel: 'AI & Agents', demo: 'bylaw',
    media: [{ src: '/projects/bylaw/screenshot-1.png', type: 'image', device: 'mobile' }],
    color: 'from-emerald-100 to-teal-100',
    darkColor: 'dark:from-emerald-950/40 dark:to-teal-950/40',
  },
  {
    id: 'travel-bot', title: 'AI Travel Assistant',
    description: 'Agentic chatbot that joins group conversations, understands preferences, and suggests destinations with booking links.',
    category: 'ai', categoryLabel: 'AI & Agents', demo: 'travel',
    media: [],
    color: 'from-violet-100 to-blue-100',
    darkColor: 'dark:from-violet-950/40 dark:to-blue-950/40',
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
    color: 'from-purple-100 to-fuchsia-100',
    darkColor: 'dark:from-purple-950/40 dark:to-fuchsia-950/40',
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
    color: 'from-indigo-100 to-purple-100',
    darkColor: 'dark:from-indigo-950/40 dark:to-purple-950/40',
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
    color: 'from-blue-100 to-cyan-100',
    darkColor: 'dark:from-blue-950/40 dark:to-cyan-950/40',
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
    color: 'from-green-100 to-lime-100',
    darkColor: 'dark:from-green-950/40 dark:to-lime-950/40',
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
    color: 'from-amber-100 to-yellow-100',
    darkColor: 'dark:from-amber-950/40 dark:to-yellow-950/40',
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
    color: 'from-orange-100 to-amber-100',
    darkColor: 'dark:from-orange-950/40 dark:to-amber-950/40',
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
    color: 'from-rose-100 to-pink-100',
    darkColor: 'dark:from-rose-950/40 dark:to-pink-950/40',
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
    color: 'from-sky-100 to-blue-100',
    darkColor: 'dark:from-sky-950/40 dark:to-blue-950/40',
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
    color: 'from-slate-100 to-gray-100',
    darkColor: 'dark:from-slate-900/50 dark:to-zinc-900/50',
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

function MediaDisplay({ media, color, darkColor }: { media: MediaItem[]; color: string; darkColor: string }) {
  const desktops = media.filter(m => m.device === 'desktop' && m.type === 'image');
  const mobiles = media.filter(m => m.device === 'mobile' && m.type === 'image');
  const videos = media.filter(m => m.type === 'video');
  const mainItems = [...desktops, ...videos];
  const dIdx = useAutoSlide(mainItems.length);

  if (mainItems.length === 0 && mobiles.length === 0) {
    return <div className={`h-72 md:h-80 bg-gradient-to-br ${color} ${darkColor}`} />;
  }

  return (
    <div className={`relative h-72 md:h-80 bg-gradient-to-br ${color} ${darkColor} overflow-hidden`}>
      {mainItems.length > 0 && (
        <>
          {mainItems.map((item, i) => (
            <div key={item.src} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: i === dIdx ? 1 : 0 }}>
              {item.type === 'video' ? (
                <video src={item.src} className="w-full h-full object-contain bg-black/90" autoPlay loop muted playsInline />
              ) : (
                <img src={item.src} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
              )}
            </div>
          ))}
          {mainItems.length > 1 && (
            <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-sm text-white text-[11px] font-mono px-2.5 py-1 rounded-full">
              {dIdx + 1}/{mainItems.length}
            </div>
          )}
        </>
      )}

      {videos.length > 0 && (
        <div className="absolute top-3 left-3 z-20 bg-black/40 backdrop-blur-sm text-white text-[11px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1">
          <Play className="w-3 h-3" /> {videos.length} video{videos.length > 1 ? 's' : ''}
        </div>
      )}

      {mobiles.length > 0 && (
        <div className="absolute bottom-0 right-4 z-10 w-[20%] max-w-[110px]" style={{ transform: 'translateY(6%)' }}>
          <CrossfadeStack items={mobiles} className="rounded-t-lg shadow-2xl shadow-black/30 overflow-hidden border dark:border-zinc-800" />
        </div>
      )}

      {mainItems.length > 1 && (
        <div className={`absolute bottom-3 z-20 flex gap-1.5 ${mobiles.length > 0 ? 'left-4' : 'left-1/2 -translate-x-1/2'}`}>
          {mainItems.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === dIdx ? 'bg-white w-5' : 'bg-white/40 w-1.5'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

function ARVRSection({ project }: { project: Project }) {
  const images = project.media.filter(m => m.type === 'image');
  const videos = project.media.filter(m => m.type === 'video');
  const imgIdx = useAutoSlide(images.length);

  return (
    <div className="col-span-1 md:col-span-2 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-lg shadow-black/5">
      <div className={`relative h-80 md:h-[480px] bg-gradient-to-br ${project.color} ${project.darkColor} overflow-hidden`}>
        {images.map((img, i) => (
          <div key={img.src} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: i === imgIdx ? 1 : 0 }}>
            <img src={img.src} alt="" className="w-full h-full object-cover object-center" loading="lazy" />
          </div>
        ))}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-sm text-white text-[11px] font-mono px-2.5 py-1 rounded-full">
            {imgIdx + 1}/{images.length}
          </div>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIdx ? 'bg-white w-5' : 'bg-white/40 w-1.5'}`} />
            ))}
          </div>
        )}
      </div>

      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-black/5 dark:bg-black/30 border-b dark:border-zinc-800/50">
          {videos.map(v => (
            <div key={v.src} className="relative rounded-xl overflow-hidden bg-black/90 aspect-video">
              <video src={v.src} className="w-full h-full object-contain" autoPlay loop muted playsInline />
              <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
                <Play className="w-2.5 h-2.5" /> Video
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[11px] font-mono uppercase tracking-wider text-primary bg-primary/8 dark:bg-primary/20 px-2.5 py-1 rounded-full">
            {project.categoryLabel}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--brand-yellow)] bg-[var(--brand-yellow)]/10 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Play className="w-3 h-3" /> {videos.length} Video{videos.length > 1 ? 's' : ''}
          </span>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
        <p className="text-sm text-foreground/70 dark:text-zinc-400 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
}

function DemoCard({ project }: { project: Project }) {
  const screenshotSrc = project.media.find(m => m.type === 'image')?.src;
  const Demo = project.demo === 'bylaw' ? ByLawDemo : TravelBotDemo;

  return (
    <div className="group bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300">
      <div className={`relative bg-gradient-to-br ${project.color} ${project.darkColor} flex items-end justify-center px-6 pt-8 pb-0 overflow-hidden`} style={{ minHeight: 540 }}>
        {screenshotSrc && (
          <div className="absolute z-0 opacity-50 dark:opacity-30" style={{ width: 300, height: 420, left: '6%', bottom: 0, transform: 'translateY(10%) rotate(-6deg)' }}>
            <div className="w-full h-full rounded-[32px] overflow-hidden shadow-xl shadow-black/20 border-2 border-white/30 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <img src={screenshotSrc} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
            </div>
          </div>
        )}

        <div className="relative z-10" style={{ width: 300, height: 420, transform: 'translateY(16px)' }}>
          <Suspense fallback={<div className="h-full flex items-center justify-center text-muted-foreground text-sm">Loading...</div>}>
            <Demo />
          </Suspense>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[11px] font-mono uppercase tracking-wider text-primary bg-primary/8 dark:bg-primary/20 px-2.5 py-1 rounded-full">
            {project.categoryLabel}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-600/10 dark:bg-emerald-500/20 px-2.5 py-1 rounded-full">
            Live Demo
          </span>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
        <p className="text-sm text-foreground/70 dark:text-zinc-400 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Category>('all');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  useEffect(() => {
    if (!sectionRef.current) return;
    const isExportMode = typeof window !== 'undefined' && window.location.search.includes('export=1');
    if (isExportMode) {
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: headingRef.current, start: 'top 90%', end: 'top 60%', scrub: 0.4 } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-background border-t border-border/70 dark:border-zinc-800/80 transition-colors duration-300">
      <div className="container">
        <div ref={headingRef} className="mb-12">
          <p className="section-label mb-3 text-primary font-mono uppercase tracking-wider text-xs">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">OUR WORK</h2>
          <p className="text-lg text-foreground/75 dark:text-zinc-400 max-w-2xl">
            From AI-powered tools and national research platforms to WordPress sites, Shopify stores, and immersive XR experiences.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filter === c.key
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-card dark:bg-zinc-900/50 border border-border dark:border-zinc-800 text-foreground/70 dark:text-zinc-400 hover:border-primary/40 dark:hover:border-primary/40 hover:text-primary dark:hover:text-primary'
                }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map(project => {
            if (project.layout === 'full') {
              return <ARVRSection key={project.id} project={project} />;
            }
            if (project.demo) {
              return <DemoCard key={project.id} project={project} />;
            }
            return (
              <div
                key={project.id}
                className="group bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300"
              >
                <MediaDisplay media={project.media} color={project.color} darkColor={project.darkColor} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-primary bg-primary/8 dark:bg-primary/20 px-2.5 py-1 rounded-full">
                      {project.categoryLabel}
                    </span>
                    {project.media.some(m => m.type === 'video') && (
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--brand-yellow)] bg-[var(--brand-yellow)]/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Play className="w-3 h-3" /> Video
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-foreground/70 dark:text-zinc-400 leading-relaxed">{project.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}