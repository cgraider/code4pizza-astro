import { useState, useEffect, useRef } from 'react';

type Token = { type: 'red' | 'yellow' | 'blue' | 'darkYellow' | 'plain'; text: string };

const LINES: Token[][] = [
  [{ type: 'red', text: 'import ' }, { type: 'plain', text: 'React ' }, { type: 'red', text: 'from ' }, { type: 'plain', text: '"' }, { type: 'yellow', text: 'react' }, { type: 'plain', text: '";' }],
  [{ type: 'red', text: 'import ' }, { type: 'plain', text: 'styled ' }, { type: 'red', text: 'from ' }, { type: 'plain', text: '"' }, { type: 'yellow', text: 'styled-components' }, { type: 'plain', text: '";' }],
  [],
  [{ type: 'red', text: 'import ' }, { type: 'plain', text: 'CodeContent ' }, { type: 'red', text: 'from ' }, { type: 'plain', text: '"' }, { type: 'yellow', text: '../../data/CodeContent' }, { type: 'plain', text: '";' }],
  [],
  [],
  [{ type: 'red', text: 'export ' }, { type: 'yellow', text: 'interface ' }, { type: 'blue', text: 'CodeBlock ' }, { type: 'plain', text: '{' }],
  [{ type: 'red', text: '  element' }, { type: 'plain', text: ': string;' }],
  [{ type: 'red', text: '  innerContent' }, { type: 'plain', text: ': string;' }],
  [{ type: 'plain', text: '}' }],
  [],
  [{ type: 'red', text: 'export ' }, { type: 'yellow', text: 'interface ' }, { type: 'blue', text: 'CodeBoxInterface ' }, { type: 'plain', text: '{' }],
  [{ type: 'red', text: '  content' }, { type: 'plain', text: ': CodeBlock[];' }],
  [{ type: 'red', text: '  duration' }, { type: 'plain', text: ': number;' }],
  [{ type: 'red', text: '  easing' }, { type: 'plain', text: ': string;' }],
  [{ type: 'plain', text: '}' }],
  [],
  [{ type: 'yellow', text: 'const ' }, { type: 'blue', text: 'CodeBox' }, { type: 'red', text: ': ' }, { type: 'yellow', text: 'React' }, { type: 'plain', text: '.' }, { type: 'yellow', text: 'FC' }, { type: 'plain', text: '<' }, { type: 'yellow', text: 'CodeBoxInterface' }, { type: 'plain', text: '> = () ' }, { type: 'red', text: '=> ' }, { type: 'plain', text: '{' }],
  [{ type: 'red', text: '  return ' }, { type: 'darkYellow', text: '<CodeBoxContainer>' }],
  [{ type: 'plain', text: '  ' }, { type: 'darkYellow', text: '<CodeBox ' }, { type: 'yellow', text: 'content' }, { type: 'plain', text: '=' }, { type: 'darkYellow', text: '{CodeContent} ' }, { type: 'yellow', text: 'duration' }, { type: 'plain', text: '=' }, { type: 'darkYellow', text: '{6} ' }, { type: 'yellow', text: 'easing' }, { type: 'plain', text: '=' }, { type: 'darkYellow', text: '"ease-in-out"' }, { type: 'darkYellow', text: ' />' }],
  [{ type: 'darkYellow', text: '</CodeBoxContainer>' }, { type: 'plain', text: ';' }],
  [{ type: 'plain', text: '}' }],
  [],
  [{ type: 'yellow', text: 'const ' }, { type: 'blue', text: 'CodeBoxContainer ' }, { type: 'red', text: '= ' }, { type: 'plain', text: 'styled.' }, { type: 'yellow', text: 'div' }, { type: 'plain', text: '`' }],
  [{ type: 'red', text: '  overflow' }, { type: 'plain', text: ': ' }, { type: 'yellow', text: 'hidden' }, { type: 'plain', text: ';' }],
  [{ type: 'red', text: '  font-family' }, { type: 'plain', text: ': ' }, { type: 'yellow', text: 'monospace' }, { type: 'plain', text: ';' }],
  [{ type: 'red', text: '  padding' }, { type: 'plain', text: ': ' }, { type: 'yellow', text: '20px' }, { type: 'plain', text: ';' }],
  [{ type: 'plain', text: '`;' }],
  [],
  [{ type: 'red', text: 'export default ' }, { type: 'plain', text: 'CodeBox;' }],
];

const LINE_DELAY_MS = 180;
const LOOP_PAUSE_MS = 2600;

export default function HeroCodeAnimation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const total = LINES.length;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    let idx = 0;

    const tick = () => {
      if (cancelled) return;
      if (idx < total) {
        setVisibleCount(idx + 1);
        idx++;
        timeoutRef.current = setTimeout(tick, LINE_DELAY_MS);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          idx = 0;
          setVisibleCount(0);
          timeoutRef.current = setTimeout(tick, 400);
        }, LOOP_PAUSE_MS);
      }
    };

    timeoutRef.current = setTimeout(tick, 280);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [total]);

  return (
    <div className="hero-code-animation-container" aria-hidden>
      <div className="hero-code-animation">
        <pre>
          {LINES.slice(0, visibleCount).map((line, i) => (
            <span key={i}>
              {line.map((token, j) => (
                <span key={j} className={`code-${token.type}`}>
                  {token.text}
                </span>
              ))}
              {'\n'}
            </span>
          ))}
          <span className="hero-code-cursor" />
        </pre>
      </div>
    </div>
  );
}
