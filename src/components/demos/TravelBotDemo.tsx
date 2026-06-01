import { useState, useEffect, useRef } from 'react';

const TYPING_TEXT = "Hey! Let's book a trip. Ideas?";
const CHAR_DELAY_MS = 35;
const LOOP_DURATION_MS = 16500;
const SEND_AT_MS = 800 + TYPING_TEXT.length * CHAR_DELAY_MS + 400;

const DESTINATIONS = [
  { name: 'Mallorca Spain', desc: 'Mountains meet Mediterranean beaches', color: 'bg-sky-500' },
  { name: 'Oahu Hawaii', desc: 'Volcanic peaks and golden shores', color: 'bg-orange-500' },
];

type Msg = { id: string; from: 'me' | 'sarah' | 'mike' | 'ai'; text: string; hasCards?: boolean };

export default function TravelBotDemo() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typingFrom, setTypingFrom] = useState<'sarah' | 'mike' | 'ai' | null>(null);
  const [phase, setPhase] = useState<'idle' | 'typing' | 'running'>('idle');
  const loopStartRef = useRef<number>(Date.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      const elapsed = Date.now() - loopStartRef.current;

      if (phase === 'idle' && elapsed >= 800) setPhase('typing');

      if (phase === 'typing') {
        const typedLen = Math.min(Math.floor((elapsed - 800) / CHAR_DELAY_MS), TYPING_TEXT.length);
        setInputText(TYPING_TEXT.slice(0, typedLen));
        if (elapsed >= SEND_AT_MS) {
          setPhase('running');
          setInputText('');
          setMessages([{ id: 'm1', from: 'me', text: TYPING_TEXT }]);
        }
      }

      if (phase === 'running' || elapsed >= SEND_AT_MS) {
        if (elapsed >= 3200) setTypingFrom(t => t === null ? 'sarah' : t);
        if (elapsed >= 4800) {
          setTypingFrom(null);
          setMessages(m => m.some(x => x.id === 's1') ? m : [...m, { id: 's1', from: 'sarah', text: "Ooh! Cabin in the mountains? 🌲" }]);
        }
        if (elapsed >= 5600) setTypingFrom('mike');
        if (elapsed >= 7200) {
          setTypingFrom(null);
          setMessages(m => m.some(x => x.id === 'm2') ? m : [...m, { id: 'm2', from: 'mike', text: "I vote beach! I need sun 🏖️" }]);
        }
        if (elapsed >= 8200) setTypingFrom('ai');
        if (elapsed >= 10200) {
          setTypingFrom(null);
          setMessages(m => m.some(x => x.id === 'a1') ? m : [...m, { id: 'a1', from: 'ai', text: "I can help! Here are top picks that blend mountains and beaches:", hasCards: true }]);
        }
      }

      if (elapsed >= LOOP_DURATION_MS) {
        setMessages([]);
        setInputText('');
        setTypingFrom(null);
        setPhase('idle');
        loopStartRef.current = Date.now();
      }

      rafRef.current = requestAnimationFrame(run);
    };

    rafRef.current = requestAnimationFrame(run);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  return (
    <div className="w-full h-full rounded-[36px] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-950 flex flex-col font-sans">
      {/* Header */}
      <div className="px-5 py-4 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-100 dark:border-zinc-900">
        <div className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Group Trip Planning</div>
        <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Sarah, Mike, You</div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 min-h-[380px] overflow-y-auto p-4 flex flex-col gap-3 bg-white dark:bg-zinc-950">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2.5 ${msg.from === 'me' ? 'justify-flex-end self-end w-full justify-end' : 'justify-start'}`}
          >
            {msg.from !== 'me' && (
              <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0 ${msg.from === 'sarah' ? 'bg-red-400' : msg.from === 'mike' ? 'bg-amber-400' : 'bg-zinc-900 dark:bg-zinc-800'
                }`}>
                {msg.from === 'ai' ? '✨' : msg.from === 'sarah' ? 'S' : 'M'}
              </div>
            )}
            <div className="flex flex-col gap-2 max-w-[80%]">
              <div className={`px-4 py-2.5 rounded-[18px] text-sm leading-relaxed ${msg.from === 'me' ? 'bg-blue-600 text-white self-end' :
                  msg.from === 'ai' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' :
                    'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100'
                }`}>
                {msg.text}
              </div>

              {msg.hasCards && (
                <div className="flex gap-3 overflow-x-auto pb-1 max-w-full snap-x">
                  {DESTINATIONS.map((d, i) => (
                    <div key={i} className="shrink-0 w-[180px] snap-start rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                      <div className={`h-20 ${d.color} flex items-center justify-center text-sm font-bold text-white px-2 text-center`}>
                        {d.name}
                      </div>
                      <div className="p-3">
                        <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1 truncate">{d.name}</div>
                        <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-3 line-clamp-2 h-7">{d.desc}</div>
                        <button className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors">
                          View Flights
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {typingFrom && (
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0 ${typingFrom === 'sarah' ? 'bg-red-400' : typingFrom === 'mike' ? 'bg-amber-400' : 'bg-zinc-900 dark:bg-zinc-800'
              }`}>
              {typingFrom === 'ai' ? '✨' : typingFrom === 'sarah' ? 'S' : 'M'}
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-3 rounded-[18px] flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.6s' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 py-2 text-sm text-zinc-400 dark:text-zinc-500 select-none">
          {phase === 'typing' ? inputText : 'iMessage'}
        </div>
      </div>
    </div>
  );
}