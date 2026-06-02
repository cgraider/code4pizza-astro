import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Layers, Brain, Store, Shield, IterationCw, Link2, Gauge, Handshake,
  MessageCircle, Bot, Sparkles, Zap, LayoutGrid, Search, Box, ArrowLeft,
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
    title: 'توسعه نرم‌افزاری که با شما رشد می‌کند',
    tagline: 'ما فقط اپلیکیشن نمی‌سازیم؛ زیرساخت‌های دیجیتالی پایداری خلق می‌کنیم که همراه کسب‌وکار شما تکامل می‌یابند.',
    icon: Layers,
    items: [
      { title: 'طراحی نقشه راه تخصصی', desc: 'معماری فنی متناسب با اهداف تجاری شما؛ سریع، منعطف و آماده برای تغییرات آینده.', icon: LayoutGrid },
      { title: 'امنیت قابل اعتماد', desc: 'بهترین پروتکل‌های رمزنگاری و حفاظتی صنعت؛ تجربه ساخت سیستم‌های امن برای بهداشت و بیوتکنولوژی.', icon: Shield },
      { title: 'توسعه چابک و تکرارشونده', desc: 'اسپرینت‌های کوتاه و شفاف تا پیشرفت کار را در هر قدم مشاهده و با هم اصلاح کنیم.', icon: IterationCw },
      { title: 'یکپارچه‌سازی اکوسیستم', desc: 'اتصال تمام سرویس‌ها و APIهای شما به یک سامانه کاملاً هماهنگ و یکپارچه.', icon: Link2 },
      { title: 'بهینه‌سازی برای سرعت غایی', desc: 'بالاترین راندمان پردازشی با تکیه بر دانش تحقیقاتی رساله دکتری در محاسبات سریع (HPC).', icon: Gauge },
      { title: 'شریک استراتژیک بلندمدت', desc: 'پشتیبانی و به‌روزرسانی مستمر نرم‌افزار تا سیستم شما همیشه کارآمد و همگام باقی بماند.', icon: Handshake },
    ],
  },
  {
    title: 'هوش مصنوعی واقعی و کاربردی',
    tagline: 'عبور از هیاهو و تبلیغات کاذب. ساخت ابزارهای هوشمندی که بارهای سنگین عملیاتی را به دوش می‌کشند.',
    icon: Brain,
    items: [
      { title: 'گفتگو با داده‌های سازمانی', desc: 'تبدیل اسناد متنی، فایل‌های مالی و پایگاه داده‌ها به یک مغز اطلاعاتی خصوصی برای چت (RAG).', icon: MessageCircle },
      { title: 'عامل‌های خودمختار (Agents)', desc: 'عامل‌های هوشمندی که پشتیبانی مشتریان، برنامه‌ریزی یا صحت‌سنجی اطلاعات را به‌طور مستقل انجام می‌دهند.', icon: Bot },
      { title: 'هوشمندسازی ساختارهای قدیمی', desc: 'ادغام الگوریتم‌های یادگیری ماشین برای اتوماسیون ارزیابی ریسک و کشف فرصت‌های رشد.', icon: Sparkles },
      { title: 'استقرار فوق‌سریع هوش مصنوعی', desc: 'استفاده از فریم‌ورک‌های سازمانی آماده جهت بومی‌سازی و پیاده‌سازی سریع مدل دلخواه شما.', icon: Zap },
    ],
  },
  {
    title: 'ویترین دیجیتال و فراتر از آن',
    tagline: 'از اولین کلیک‌ها تا پرداخت نهایی؛ طراحی سایت‌ها و فروشگاه‌هایی که مخاطب را به مشتری تبدیل می‌کنند.',
    icon: Store,
    items: [
      { title: 'توسعه وردپرس و شاپیفای', desc: 'راه‌اندازی سکوهای فروشگاهی و محتوایی با مدیریت آسان برای شما و تجربه کاربری فراموش‌نشدنی.', icon: LayoutGrid },
      { title: 'افزونه‌های کاملاً اختصاصی', desc: 'برنامه‌نویسی و توسعه پلاگین‌های کاستوم وردپرس وقتی هیچ نمونه آماده‌ای پاسخگوی نیاز شما نیست.', icon: Puzzle },
      { title: 'سئو مبتنی بر داده', desc: 'بهینه‌سازی مهندسی‌شده ساختار سایت تا اولین پاسخی باشید که مخاطبان در موتورهای جستجو می‌بینند.', icon: Search },
    ],
  },
  {
    title: 'دنیای سه‌بعدی، AR ،VR و WebGL',
    tagline: 'خلق تجربه‌های غوطه‌وری و پردازش ۳D مستقیم در مرورگر وب.',
    icon: Box,
    items: [
      { title: 'برنامه‌های واقعیت افزوده (AR)', desc: 'نمایش واقع‌گرایانه محصولات در محیط واقعی کاربر قبل از خرید جهت ارتقای نرخ تبدیل.', icon: Box },
      { title: 'شبیه‌سازهای واقعیت مجازی (VR)', desc: 'توسعه اپلیکیشن‌های واقعیت مجازی برای سیستم‌های آموزشی پیشرفته، تورهای مجازی و روایتگری.', icon: Layers },
      { title: 'سایت‌های مبتنی بر WebGL', desc: 'رندرینگ سه‌بعدی تعاملی و پرفورمنس بالا در وب بدون نیاز به نصب برنامه جانبی.', icon: Globe },
    ],
  },
  {
    title: 'ربات‌ها و اتوماسیون‌های مقیاس‌پذیر',
    tagline: 'توسعه اسکریپت‌ها و ربات‌های اختصاصی برای استخراج داده، پیام‌رسان‌ها و گردش کارهای اتوماتیک.',
    icon: Bot,
    items: [
      { title: 'ربات‌های تلگرام و دیسکورد', desc: 'طراحی بات‌های پیشرفته برای مدیریت جوامع کاربری، اتوماسیون پشتیبانی و سیستم‌های اعلان.', icon: Send },
      { title: 'کراولرها و استخراج داده', desc: 'خزنده‌های تحت وب پایدار و ایمن جهت جمع‌آوری اطلاعات و تغذیه خودکار پایگاه‌های داده.', icon: Globe },
      { title: 'ربات‌های مجهز به هوش مصنوعی', desc: 'بات‌های چت هوشمند که با درک متن و کانتکست، گفتگوها را به‌صورت ۲۴ ساعته هدایت می‌کنند.', icon: MessageCircle },
      { title: 'خطوط اتوماسیون اختصاصی', desc: 'متصل کردن ابزارهای نرم‌افزاری پراکنده به یکدیگر و حذف کامل فرآیندهای تکراری دستی.', icon: Workflow },
    ],
  },
  {
    title: 'سیستم‌های آموزشی اختصاصی (LMS)',
    tagline: 'حذف هزینه‌های سنگین لایسنس‌های خارجی با راه‌اندازی پلتفرم آموزشی بومی و تحت مالکیت کامل شما.',
    icon: GraduationCap,
    items: [
      { title: 'سامانه LMS بر پایه Moodle', desc: 'پیاده‌سازی هسته قدرتمند مودل بدون محدودیت در تعداد ثبت‌نام کاربران یا هزینه‌های پنهان سازندگان.', icon: GraduationCap },
      { title: 'شخصی‌سازی فرآیند یادگیری', desc: 'تعریف دوره‌ها، سطوح دسترسی، آزمون‌ها و کارنامه‌ها دقیقاً منطبق بر مدل آموزشی سازمان شما.', icon: Layers },
      { title: 'یکپارچگی کامل برندینگ', desc: 'طراحی اختصاصی رابط کاربری و اتصال به درگاه‌های پرداخت، سیستم‌های پیامکی و اداری داخلی.', icon: LayoutGrid },
    ],
  },
];

function ServiceTile({ item, index }: { item: { title: string; desc: string; icon: LucideIcon }; index: number }) {
  const Icon = item.icon;
  return (
    <div className="service-tile group relative p-5 rounded-xl bg-tile border border-tile-border transition-all duration-200 hover:border-tile-border-hover hover:bg-tile-hover text-right">
      {/* Index counter flipped properly to top-left for standard Farsi interface layout alignment */}
      <span className="absolute top-4 left-4 text-xs font-mono text-muted-foreground/25 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

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
    <section id="services" ref={containerRef} className="services-section py-24 md:py-36 border-t border-section-border text-right">
      <div className="container max-w-7xl px-6 mx-auto">

        {/* ── Section Header ── */}
        <header className="services-header mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-5">
            <span className="section-eyebrow">توانمندی‌های مهندسی ما</span>
            <span className="eyebrow-rule" aria-hidden />
          </div>
          <div className="services-header-grid">
            <h2 className="services-h2 text-foreground">
              تمرکز و خدمات ما
            </h2>
            <p className="services-intro text-muted-foreground">
              شما در حال عبور از مرحله «استخدام یک کدنویس ساده» به «همکاری با یک تیم استراتژی فنی» هستید. ما سیستم‌هایی را معماری می‌کنیم که برای کارایی بالا، امنیت پایدار و استقلال طولانی‌مدت ساخته شده‌اند.
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
                {/* Left Side: Layout label block meta row */}
                <div className="svc-left-col lg:col-span-4 lg:sticky lg:top-28 h-fit">
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

                {/* Right Side: Grid Cells cluster */}
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
            <span className="section-eyebrow mb-4 block">بیایید همکاری را شروع کنیم</span>
            <h3 className="footer-cta-heading text-foreground mb-8">
              آماده‌اید دقت و ظرافت مهندسی نرم‌افزار را به محصول خود اضافه کنید؟
            </h3>
            <Button size="lg" className="cta-button group inline-flex items-center gap-2 rounded-lg h-12 px-7 text-sm font-semibold" asChild>
              <a href="#contacts">
                شروع یک پروژه جدید
                <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" aria-hidden />
              </a>
            </Button>
          </div>

          {/* ── Corporate Philosophy Blockquote ── */}
          <blockquote className="pull-quote mt-20 rounded-2xl text-right">
            <p className="pull-quote-text text-foreground">
              «بیایید با هم یک سیستم بزرگ بسازیم.»
            </p>
            <div className="pull-quote-body space-y-3 text-muted-foreground mt-4">
              <p>
                ما تیمی از پژوهشگران و مهندسان هستیم که بیش از ۸ سال از عمر خود را صرف ساخت سیستم‌های گوناگون کرده‌ایم؛ از پلتفرم‌های تحقیقاتی ملی که به بیش از ۱۰۰ دانشگاه خدمات ارائه می‌دهند تا ابزارهای هوش مصنوعی پیشرفته‌ای که هفته‌ها کار دستی خسته‌کننده متخصصان را حذف می‌کنند.
              </p>
              <p>
                ما عاشق حل کردن چالش‌های سخت مهندسی هستیم، اما دیدن موفقیت و درخشش شرکای تجاری‌مان برای ما از هر چیز دیگری لذت‌بخش‌تر است.
              </p>
            </div>
            <footer className="pull-quote-footer mt-8 pt-5 border-t border-quote-border flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden />
              <span className="text-xs font-mono text-muted-foreground font-medium">— تیم توسعه code4pizza</span>
            </footer>
          </blockquote>
        </footer>

      </div>
    </section>
  );
}