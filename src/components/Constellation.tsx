import { useEffect, useRef } from "react";

/**
 * Constellations from version 1 (brain, suspension bridge), re-toned for v2's white theme:
 * outlined triangles in ink and grey with a few soft landscape tones
 * (sage, sky, sand) picked up from the hero video.
 *
 * - Particles fly in and assemble when the section first scrolls into view.
 * - The pointer gently pushes particles away (mouse and touch).
 * - Pauses offscreen; visitors who prefer reduced motion get a still image.
 */

type P = {
  hx: number; hy: number; sx: number; sy: number;
  size: number; rot: number; spin: number;
  phase: number; amp: number; color: string; alpha: number; delay: number;
};

const INK = ["#000000", "#000000", "#1f1f1f", "#3a3a3a", "#6f6f6f", "#6f6f6f", "#9a9a9a"];
const TONES = ["#7f9a7a", "#8fa9c4", "#c8b48a"]; // sage, sky, sand
const PUSH_RADIUS = 90;
const ASSEMBLE_SECONDS = 2.2;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Side-view brain: wobbly cortex, cerebellum, stem. Returns a point in ~[-1, 1]. */
function brainPoint(): [number, number] {
  for (;;) {
    const x = rand(-1, 1), y = rand(-1, 1);
    const t = Math.atan2(y + 0.05, x / 1.18);
    const r = Math.hypot(x / 1.18, (y + 0.05) / 0.82);
    const edge = 0.86 + 0.05 * Math.sin(t * 7) + 0.035 * Math.sin(t * 13 + 1.3);
    const inCortex = r < edge && y < 0.5;
    const inCereb = Math.hypot((x - 0.42) / 0.36, (y - 0.5) / 0.2) < 1;
    const inStem = Math.abs(x - 0.12 + (y - 0.55) * 0.35) < 0.09 && y > 0.4 && y < 0.95;
    if (!(inCortex || inCereb || inStem)) continue;
    // Denser toward the outline and along the folds.
    const fold = Math.abs(Math.sin(x * 9 + Math.sin(y * 6) * 1.4));
    if (inCortex && Math.random() > 0.35 + 0.55 * Math.pow(r / edge, 2) * (0.6 + 0.4 * fold)) continue;
    return [x * 0.92, y * 0.92];
  }
}

/** Suspension bridge: two towers, sagging main cable, deck, hangers. */
function bridgePoint(): [number, number] {
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  const T = 0.62, TOP = -0.52, DECK = 0.3, SAG = 0.14;
  const cable = (x: number) => {
    const ax = Math.abs(x);
    return ax <= T ? SAG - (SAG - TOP) * Math.pow(ax / T, 2) : TOP + (DECK - TOP) * ((ax - T) / (1 - T));
  };
  const k = Math.random(), x = rand(-1, 1);
  if (k < 0.38) return [x, cable(x) + gauss() * 0.03]; // main cable
  if (k < 0.66) return [x, DECK + gauss() * 0.028]; // deck
  if (k < 0.84) { // hangers
    let hx = Math.round(x * 9) / 9;
    if (Math.abs(Math.abs(hx) - T) < 0.05) hx += 0.11;
    return [hx + gauss() * 0.01, rand(Math.min(cable(hx), DECK), DECK)];
  }
  const side = Math.random() < 0.5 ? -T : T; // towers
  return [side + gauss() * 0.022, rand(TOP - 0.06, 0.72)];
}

const SHAPES = { brain: { point: brainPoint, density: 1 }, bridge: { point: bridgePoint, density: 0.75 } };
export type ConstellationShape = keyof typeof SHAPES;

const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));

export default function Constellation({
  className = "",
  scale = 0.5,
  shape = "brain",
}: {
  className?: string;
  scale?: number;
  shape?: ConstellationShape;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0;
    let particles: P[] = [];
    let raf = 0;
    let visible = false;
    let started: number | null = null; // time the assemble began
    const mouse = { x: -9999, y: -9999 };

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { point, density } = SHAPES[shape];
      const count = Math.round(Math.min(2000, (w * h) / 150) * density);
      const s = Math.min(w, h) * scale;
      const cx = w / 2, cy = h / 2;
      particles = Array.from({ length: count }, () => {
        const ambient = Math.random() < 0.12;
        const [px, py] = ambient ? [rand(-1, 1) * (w / 2 / s), rand(-1, 1) * (h / 2 / s)] : point();
        const toned = Math.random() < 0.14;
        return {
          hx: cx + px * s, hy: cy + py * s,
          sx: cx + rand(-1.4, 1.4) * w * 0.5, sy: cy + rand(-1.4, 1.4) * h * 0.5,
          size: ambient ? rand(1.4, 2.6) : rand(1.6, 3.8),
          rot: rand(0, Math.PI * 2), spin: rand(-0.6, 0.6),
          phase: rand(0, Math.PI * 2), amp: ambient ? rand(3, 8) : rand(0.6, 2.4),
          color: toned ? TONES[(Math.random() * TONES.length) | 0] : INK[(Math.random() * INK.length) | 0],
          alpha: ambient ? rand(0.12, 0.3) : rand(0.55, 0.95),
          delay: rand(0, 0.35),
        };
      });
    }

    function draw(now: number) {
      const t = now / 1000;
      const k0 = started === null ? 0 : (now - started) / 1000;
      ctx!.clearRect(0, 0, w, h);
      ctx!.lineWidth = 1;
      for (const p of particles) {
        let x = p.hx + Math.sin(t * 0.6 + p.phase) * p.amp;
        let y = p.hy + Math.cos(t * 0.5 + p.phase * 1.3) * p.amp;
        if (!reduceMotion) {
          const k = ease((k0 - p.delay) / ASSEMBLE_SECONDS);
          x = p.sx + (x - p.sx) * k;
          y = p.sy + (y - p.sy) * k;
        }
        const dx = x - mouse.x, dy = y - mouse.y, d = Math.hypot(dx, dy);
        if (d < PUSH_RADIUS) {
          const f = (1 - d / PUSH_RADIUS) * 16;
          x += (dx / (d || 1)) * f;
          y += (dy / (d || 1)) * f;
        }
        const a = p.rot + t * p.spin, s = p.size;
        ctx!.globalAlpha = p.alpha * (0.78 + 0.22 * Math.sin(t * 1.4 + p.phase * 2));
        ctx!.strokeStyle = p.color;
        ctx!.beginPath();
        ctx!.moveTo(x + Math.cos(a) * s, y + Math.sin(a) * s);
        ctx!.lineTo(x + Math.cos(a + 2.094) * s, y + Math.sin(a + 2.094) * s);
        ctx!.lineTo(x + Math.cos(a + 4.189) * s, y + Math.sin(a + 4.189) * s);
        ctx!.closePath();
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
    }

    function loop(now: number) {
      if (!visible) { raf = 0; return; }
      draw(now);
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (reduceMotion || raf) return;
      raf = requestAnimationFrame(loop);
    }

    build();
    draw(reduceMotion ? 0 : performance.now());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (started === null) started = performance.now();
        start();
      }
    }, { threshold: 0.15 });
    io.observe(host);

    const ro = new ResizeObserver(() => { build(); draw(performance.now()); });
    ro.observe(host);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (reduceMotion) draw(0);
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; if (reduceMotion) draw(0); };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [scale, shape]);

  return (
    <div ref={hostRef} className={`relative ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
