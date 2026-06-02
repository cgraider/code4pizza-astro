import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoBrand from '@/components/LogoBrand';
import { ThemeToggle } from "./ThemeToggle";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'خدمات ما', href: '#services' },
    { label: 'پروژه‌ها', href: '#projects' },
    { label: 'درباره ما', href: '#about' },
    { label: 'تماس با ما', href: '#contacts' },
  ];

  return (
    <>
      {/* 1. MAIN NAVIGATION HEADER */}
      <header className="absolute top-0 left-0 right-0 z-50 pt-4 md:pt-6 text-right">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col rounded-2xl border border-border/70 bg-background/95 shadow-[var(--shadow-card)] transition-all duration-300 md:rounded-full">

            {/* Main Navbar Bar */}
            <nav className="flex items-center justify-between px-5 py-4 md:py-3.5">

              {/* Logo & Brand Text - Ordered correctly for Persian inline text */}
              <a href="#" className="flex items-center gap-2 sm:gap-3" aria-label="خانه code4pizza">
                <LogoBrand size={40} animate />
                <span className="flex flex-col leading-none gap-1">
                  <span
                    className="font-bold text-base sm:text-lg text-foreground tracking-tight"
                    style={{ fontFamily: "'Vazirmatn', sans-serif" }}
                  >
                    code4pizza
                  </span>
                  <span
                    className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-medium"
                    style={{ fontFamily: "'Vazirmatn', sans-serif" }}
                  >
                    راهکارهای فنی و مهندسی
                  </span>
                </span>
              </a>

              {/* Desktop Navigation Link Cluster */}
              <div className="hidden lg:flex items-center gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm text-foreground/90 hover:text-primary transition-colors font-medium"
                    style={{ fontFamily: "'Vazirmatn', sans-serif" }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* CTA + Mobile Menu Action System */}
              <div className="flex items-center gap-2">
                <Button
                  className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white text-sm rounded-full px-5 font-medium"
                  style={{ fontFamily: "'Vazirmatn', sans-serif" }}
                  asChild
                >
                  <a href="#contacts">شروع یک پروژه</a>
                </Button>
                <button
                  className="lg:hidden rounded-lg p-2 text-foreground hover:bg-muted/50 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? 'بستن منو' : 'باز کردن منو'}
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <span className={`absolute transform transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                      <Menu size={22} />
                    </span>
                    <span className={`absolute transform transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                      <X size={22} />
                    </span>
                  </div>
                </button>
              </div>
            </nav>

            {/* Animated Mobile Dropdown Container */}
            <div
              className={`grid transition-all duration-300 ease-in-out lg:hidden ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-1 flex flex-col gap-1 border-t border-border/40 mx-2">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="rounded-lg px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 hover:text-primary transition-colors font-medium"
                      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="mt-2 border-t border-border/40 pt-3">
                    <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium" style={{ fontFamily: "'Vazirmatn', sans-serif" }} asChild>
                      <a href="#contacts" onClick={() => setIsOpen(false)}>شروع یک پروژه</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Floating Viewport Actions Mounted Globally */}
      <ThemeToggle />
    </>
  );
}