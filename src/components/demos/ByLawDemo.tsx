import { useState, useEffect, useRef } from 'react';

const LOOP_MS = 9000;
const PARTS = ['Select part...', 'Part 9 (Small Buildings)', 'Part 3 (Large Buildings)'];
const MSG1 = 'Verified. Part 9 applies to buildings 3 storeys or less, with a building area under 600m².';
const MSG2 = '450m² is within the legal 600m² limit for Part 9 structures.';

export default function ByLawDemo() {
  const [selectedPart, setSelectedPart] = useState(0);
  const [areaValue, setAreaValue] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);
  const startRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      const t = (Date.now() - startRef.current) % LOOP_MS;
      const sec = t / 1000;

      if (sec >= 1) setSelectedPart(1);
      if (sec < 1) setSelectedPart(0);

      if (sec >= 3) setAiMessage(MSG1);
      if (sec < 1) setAiMessage('');

      if (sec >= 4) {
        const chars = Math.min(Math.floor((sec - 4) / 0.2), 3);
        setAreaValue('450'.slice(0, chars));
      }
      if (sec < 4) setAreaValue('');

      if (sec >= 4.6) setAiMessage(MSG2);
      if (sec >= 6) setShowSubmit(true);
      if (sec < 6) setShowSubmit(false);

      rafRef.current = requestAnimationFrame(run);
    };

    rafRef.current = requestAnimationFrame(run);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="w-full h-full rounded-[32px] p-3 bg-neutral-100 dark:bg-zinc-900 shadow-xl overflow-hidden">
      <div className="rounded-[24px] overflow-hidden bg-white dark:bg-zinc-950 font-sans p-5 shadow-inner">
        <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">
          Construction Permit
        </h3>

        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
          Building Code Part
        </label>
        <select
          value={selectedPart}
          disabled
          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 mb-4 outline-none opacity-90"
        >
          {PARTS.map((p, i) => (
            <option key={i} value={i}>
              {p}
            </option>
          ))}
        </select>

        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
          Building Area (m²)
        </label>
        <input
          type="text"
          value={areaValue}
          readOnly
          placeholder="Enter area"
          className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 mb-3 outline-none"
        />

        {aiMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border-l-4 border-emerald-500 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed mb-4 animate-fade-in">
            {aiMessage}
          </div>
        )}

        {showSubmit && (
          <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold cursor-default transition-colors animate-slide-down">
            Submit Application
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.3s ease forwards; }
        .animate-slide-down { animation: slideDown 0.3s ease forwards; }
      `}</style>
    </div>
  );
}