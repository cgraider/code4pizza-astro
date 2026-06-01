import { useEffect, useRef, useState } from 'react';

/**
 * Eddy particle swirl — from Dillon / Alex Andrix's Codepen.
 * Our Work palette (emerald, violet, purple, indigo, blue, teal), pre-simulated,
 * semi-transparent so hero text stays readable on cream background.
 */

/** Brand (red, amber) + Our Work palette hues (HSL) */
const LINE_HUES = [0, 38, 160, 250, 275, 235, 215, 175];

const NB_EDDIES = 7;
const NB_PARTICLES = 1003;
const LIFE_TIME = 1000;
const PRE_SIM = 400;

const { random: mrandom, floor: mfloor, ceil: mceil, min: mmin,
  exp: mexp, hypot: mhypot, sqrt: msqrt } = Math;

function alea(min: number, max?: number) {
  if (max === undefined) return min * mrandom();
  return min + (max - min) * mrandom();
}
function intAlea(min: number, max?: number) {
  if (max === undefined) { max = min; min = 0; }
  return mfloor(min + (max - min) * mrandom());
}
function arrayShuffle<T>(arr: T[]) {
  for (let k = arr.length - 1; k >= 1; --k) {
    const k1 = intAlea(0, k + 1);
    [arr[k], arr[k1]] = [arr[k1], arr[k]];
  }
  return arr;
}

interface Cell { kx: number; ky: number; cnt: number }

class Eddy {
  x: number; y: number; coeffR: number; radius: number;
  coeffA1: number; coeffA2: number; dir: number;
  constructor(rw: number, rh: number) {
    this.x = alea(-0.02, rw + 0.02);
    this.y = alea(-0.02, rh + 0.02);
    this.coeffR = 0.001 * alea(0.7, 1.3);
    this.radius = 0.2 + alea(-0.1, 0.1);
    this.coeffA1 = 0.017 * alea(0.8, 1.2);
    this.coeffA2 = 0.01 * alea(0.8, 1.2);
    this.dir = mrandom() > 0.5 ? 1 : -1;
  }
}

class Particle {
  x: number; y: number; lightness: number; hue: number;
  TTL: number; nbout: number;
  constructor(cells: Cell[], kcellRef: { v: number }, lRef: number, ncx: number, sortFn: () => void) {
    const c = cells[kcellRef.v];
    kcellRef.v++;
    if (kcellRef.v > 0.0005 * cells.length) { sortFn(); kcellRef.v = 0; }
    const x = c.kx + mrandom() - 5;
    const y = c.ky + mrandom() - 5;
    this.x = x / lRef;
    this.y = y / lRef;
    this.lightness = intAlea(25, 65);
    this.hue = LINE_HUES[intAlea(0, LINE_HUES.length) | 0];
    this.TTL = alea(LIFE_TIME * 0.8, LIFE_TIME * 1.2);
    this.nbout = 0;
  }
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let maxx = 0, maxy = 0, lRef = 0, rWidth = 0, rHeight = 0;
    let eddies: Eddy[] = [];
    let particles: Particle[] = [];
    let cells: Cell[] = [];
    let tbCells: Cell[][] = [];
    let ncx = 0, ncy = 0;
    const kcellRef = { v: 0 };
    let noGen = false;

    function sortCells() {
      cells.sort((c1, c2) => {
        if (c1.cnt !== c2.cnt) return c1.cnt - c2.cnt;
        const d1x = c1.kx < ncx / 2 ? c1.kx : ncx - 1 - c1.kx;
        const d1y = c1.ky < ncy / 2 ? c1.ky : ncy - 1 - c1.ky;
        const d1 = mmin(d1x, d1y);
        const d2x = c2.kx < ncx / 2 ? c2.kx : ncx - 1 - c2.kx;
        const d2y = c2.ky < ncy / 2 ? c2.ky : ncy - 1 - c2.ky;
        const d2 = mmin(d2x, d2y);
        return d1 - d2;
      });
    }

    function moveStep(draw: boolean) {
      for (let k = 0; k < NB_PARTICLES; k++) {
        let part = particles[k];
        if (part.TTL <= 0 || part.nbout > 10) {
          if (noGen) continue;
          part = new Particle(cells, kcellRef, lRef, ncx, sortCells);
          particles[k] = part;
        }
        const prev = { x: part.x, y: part.y };
        const kxc = mfloor(prev.x * lRef) + 5;
        const kyc = mfloor(prev.y * lRef) + 5;
        if (kxc >= 0 && kxc < ncx && kyc >= 0 && kyc < ncy) {
          tbCells[kyc][kxc].cnt++;
          part.nbout = 0;
        } else {
          part.nbout++;
        }

        for (const eddy of eddies) {
          const dx = prev.x - eddy.x;
          const dy = prev.y - eddy.y;
          let r = mhypot(dx, dy);
          if (r < 0.0001) r = 0.00001;
          const s = dy / r;
          const c = dx / r;
          const deltar = r - eddy.radius;
          const av = eddy.coeffA2 * mexp((-deltar * deltar) / eddy.coeffA1) * eddy.dir;
          const rv = -deltar * eddy.coeffR;
          part.x += rv * c - av * r * s;
          part.y += rv * s + av * r * c;
        }
        part.TTL--;

        if (draw) {
          ctx.beginPath();
          ctx.moveTo(prev.x * lRef, prev.y * lRef);
          ctx.lineTo(part.x * lRef, part.y * lRef);
          const sat = part.hue <= 45 ? 45 : 35;
          ctx.strokeStyle = `hsla(${part.hue}, ${sat}%, ${part.lightness}%, 0.75)`;
          ctx.stroke();
        }
      }
    }

    function startOver() {
      noGen = false;
      const rect = container.getBoundingClientRect();
      maxx = rect.width || window.innerWidth;
      maxy = rect.height || window.innerHeight;
      lRef = msqrt(maxx * maxy);
      canvas.width = maxx;
      canvas.height = maxy;
      rWidth = maxx / lRef;
      rHeight = maxy / lRef;

      cells = [];
      ncx = mceil(maxx + 10);
      ncy = mceil(maxy + 10);
      tbCells = new Array(ncy).fill(0).map((_, ky) =>
        new Array(ncx).fill(0).map((_, kx) => {
          const c: Cell = { kx, ky, cnt: 0 };
          cells.push(c);
          return c;
        })
      );
      arrayShuffle(cells);
      sortCells();
      kcellRef.v = 0;
      ctx.lineWidth = 1;

      eddies = [];
      for (let k = 0; k < NB_EDDIES; k++) eddies.push(new Eddy(rWidth, rHeight));
      particles = [];
      for (let k = 0; k < NB_PARTICLES; k++) {
        const p = new Particle(cells, kcellRef, lRef, ncx, sortCells);
        p.TTL = intAlea(LIFE_TIME);
        particles.push(p);
      }

      ctx.fillStyle = `hsl(18, 10%, ${intAlea(22, 38)}%)`;
      ctx.fillRect(0, 0, maxx, maxy);

      // Pre-simulate so it looks mature on first frame
      for (let i = 0; i < PRE_SIM; i++) moveStep(i > PRE_SIM - 250);
      setReady(true);
    }

    function frame() {
      rafRef.current = requestAnimationFrame(frame);
      moveStep(true);
    }

    startOver();
    rafRef.current = requestAnimationFrame(frame);
    window.addEventListener('resize', startOver);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', startOver);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-[1500ms]"
      style={{ opacity: ready ? 0.42 : 0 }}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 92%, var(--primary)) 15%, transparent 100%)',
          zIndex: 2,
        }}
      />
    </div>
  );
}
