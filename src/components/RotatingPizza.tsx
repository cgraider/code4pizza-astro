export default function RotatingPizza({ className = '', size = 160 }: { className?: string; size?: number }) {
  const uid = 'hero-pizza';
  const cx = 60;
  const cy = 60;
  const rOuter = 50;
  const rInner = 43;

  const codeLines: { text: string; type: 'keyword' | 'plain' | 'string' | 'comment' | 'fn' }[] = [
    { text: "const slice = () => {", type: 'keyword' },
    { text: "  return 'hot';", type: 'plain' },
    { text: "};", type: 'plain' },
    { text: "// code4pizza", type: 'comment' },
    { text: "build(<Pizza />);", type: 'plain' },
    { text: "export default slice;", type: 'keyword' },
  ];

  const colors = {
    keyword: '#f59e0b',
    plain: '#e5e7eb',
    string: '#86efac',
    comment: '#6b7280',
    fn: '#a78bfa',
  };

  const lineHeight = 6;
  const startY = cy - (codeLines.length * lineHeight) / 2 + lineHeight / 2;
  const fontSize = 3.8;

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full animate-pizza-spin drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${uid}-crust`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id={`${uid}-crust-inner`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
          <radialGradient id={`${uid}-code-bg`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="100%" stopColor="#292524" />
          </radialGradient>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#92400e" floodOpacity="0.4" />
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.15" />
          </filter>
          <clipPath id={`${uid}-inner-clip`}>
            <circle cx={cx} cy={cy} r={rInner} />
          </clipPath>
        </defs>

        {/* Outer glow */}
        <circle cx={cx} cy={cy} r="58" fill={`url(#${uid}-glow)`} />

        {/* Crust ring */}
        <circle cx={cx} cy={cy} r={rOuter} fill={`url(#${uid}-crust)`} filter={`url(#${uid}-shadow)`} />
        <circle cx={cx} cy={cy} r={rOuter - 3} fill={`url(#${uid}-crust-inner)`} opacity={0.9} />

        {/* Inner circle: code background + clip */}
        <g clipPath={`url(#${uid}-inner-clip)`}>
          <circle cx={cx} cy={cy} r={rInner} fill={`url(#${uid}-code-bg)`} />
          {/* Code lines explicit LTR enforcement inside SVG text tags */}
          {codeLines.map((line, i) => (
            <text
              key={i}
              x={cx}
              y={startY + i * lineHeight}
              textAnchor="middle"
              fill={colors[line.type]}
              fontSize={fontSize}
              fontFamily="ui-monospace, monospace"
              fontWeight={line.type === 'keyword' ? 600 : 400}
              opacity={line.type === 'comment' ? 0.85 : 1}
              style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}
            >
              {line.text}
            </text>
          ))}
        </g>

        {/* Slice lines */}
        <line x1={cx} y1={cy - rInner} x2={cx} y2={cy + rInner} stroke="#92400e" strokeWidth="1" opacity="0.5" />
        <line x1={cx - rInner} y1={cy} x2={cx + rInner} y2={cy} stroke="#92400e" strokeWidth="1" opacity="0.5" />
        <line x1={cx - rInner * 0.7} y1={cy - rInner * 0.7} x2={cx + rInner * 0.7} y2={cy + rInner * 0.7} stroke="#92400e" strokeWidth="1" opacity="0.5" />
        <line x1={cx + rInner * 0.7} y1={cy - rInner * 0.7} x2={cx - rInner * 0.7} y2={cy + rInner * 0.7} stroke="#92400e" strokeWidth="1" opacity="0.5" />

        {/* Crust rim highlight */}
        <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="#fcd34d" strokeWidth="0.8" opacity="0.25" />
        <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="#f59e0b" strokeWidth="0.6" opacity="0.2" />
      </svg>
    </div>
  );
}