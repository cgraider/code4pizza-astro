import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
    const { toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="fixed z-[9999] flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200/80 bg-white/90 text-neutral-900 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 dark:border-zinc-800/80 dark:bg-zinc-950/90 dark:text-zinc-50"
            style={{
                /* Anchored from right edge with safe area inset support */
                right: 'max(1.25rem, env(safe-area-inset-right, 1.25rem))',
                /* On mobile: sit near top of screen so it's never behind the CTA.
                   On sm+ where FloatingCTA appears, raise above it. */
                bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
            }}
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                {/* Sun */}
                <svg
                    className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {/* Moon */}
                <svg
                    className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 118.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            </div>
        </button>
    );
}