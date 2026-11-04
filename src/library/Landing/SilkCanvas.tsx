"use client";

import { useEffect, useRef } from "react";

type Form = { o: number; w: number; r: number[][] };
type FormAt = { A: Form; B: Form; k: number };

const SCALE = 0.75;
const PALETTE: Record<string, number[][]> = {
  blanco: [[118, 126, 152, 0.92], [252, 253, 255, 1]],
  niebla: [[112, 122, 150, 0.92], [255, 255, 255, 1]],
  cobalto: [[10, 24, 96, 0.9], [205, 220, 255, 0.95]],
  tinta: [[4, 9, 24, 0.92], [125, 165, 245, 0.9]],
};
const TINTS = [[40, 80, 215], [91, 141, 239], [255, 122, 89]];

function forms(mobile: boolean): Form[] {
  const d = mobile ? 0.08 : 0;
  const width = mobile ? 0.6 : 1;
  const opacity = mobile ? 0.8 : 1;
  return [
    { o: mobile ? 0.5 : 1, w: 0.085 * width, r: [[-0.15, 0.93 + d, 0.60, 0.93 + d, 0.86, 0.93 + d, 1.12, -0.10], [-0.15, 0.945 + d, 0.60, 0.945 + d, 0.88, 0.93 + d, 1.12, 0.42], [-0.15, 0.96 + d, 0.60, 0.96 + d, 0.86, 1.00 + d, 1.12, 1.15]] },
    { o: 0.45 * opacity, w: 0.045 * width, r: [[0.80, -0.12, 0.70, 0.35, 1.02, 0.60, 0.86, 1.12], [0.88, -0.12, 0.78, 0.37, 1.08, 0.63, 0.93, 1.12], [0.96, -0.12, 0.86, 0.40, 1.14, 0.66, 1.00, 1.12]] },
    { o: 0.35 * opacity, w: 0.05 * width, r: [[-0.15, 1.10, 0.30, 0.82, 0.60, 1.08, 1.15, 0.62], [-0.15, 1.18, 0.30, 0.90, 0.63, 1.13, 1.15, 0.73], [-0.15, 1.26, 0.30, 0.98, 0.66, 1.18, 1.15, 0.84]] },
    { o: 0.5 * opacity, w: 0.045 * width, r: [[1.15, 0.06, 0.36, -0.14, 0.36, 1.14, 1.15, 0.94], [1.15, 0.15, 0.45, -0.02, 0.45, 1.02, 1.15, 0.85], [1.15, 0.24, 0.54, 0.10, 0.54, 0.90, 1.15, 0.76]] },
    { o: 0.4 * opacity, w: 0.04 * width, r: [[-0.15, 0.86, 0.35, 0.70, 0.65, 1.00, 1.15, 0.84], [-0.15, 0.91, 0.35, 0.75, 0.65, 1.05, 1.15, 0.89], [-0.15, 0.96, 0.35, 0.80, 0.65, 1.10, 1.15, 0.94]] },
    { o: 0.4 * opacity, w: 0.05 * width, r: [[1.15, 0.90, 0.75, 0.90, 0.62, 0.70, 0.95, -0.15], [1.15, 0.915, 0.75, 0.915, 0.70, 0.80, 1.06, -0.15], [1.15, 0.93, 0.75, 0.93, 0.48, 1.02, 0.15, 1.25]] },
    { o: 0.4 * opacity, w: 0.045 * width, r: [[0.02, 1.12, 0.14, 0.62, -0.10, 0.40, 0.10, -0.12], [-0.06, 1.12, 0.06, 0.62, -0.15, 0.37, 0.03, -0.12], [-0.14, 1.12, -0.02, 0.62, -0.20, 0.34, -0.04, -0.12]] },
    { o: 0.6 * opacity, w: 0.07 * width, r: [[-0.15, 0.92 + d, 0.60, 0.92 + d, 0.86, 0.92 + d, 1.12, 0.05], [-0.15, 0.935 + d, 0.60, 0.935 + d, 0.88, 0.92 + d, 1.12, 0.48], [-0.15, 0.95 + d, 0.60, 0.95 + d, 0.86, 0.99 + d, 1.12, 1.15]] },
  ];
}

export default function SilkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pixelRatio = 1;
    let current = PALETTE.blanco.map((color) => [...color]);
    let sectionElements: HTMLElement[] = [];
    let formations = forms(false);
    let animationFrame = 0;
    let last = performance.now();
    let time = 0;
    const lerp = (a: number, b: number, amount: number) => a + (b - a) * amount;
    const smooth = (value: number) => {
      const x = Math.max(0, Math.min(1, value));
      return x * x * (3 - 2 * x);
    };
    const resize = () => {
      // Retain the source's 75% raster scale while increasing backing detail on retina displays.
      pixelRatio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(innerWidth * SCALE * pixelRatio);
      canvas.height = Math.round(innerHeight * SCALE * pixelRatio);
      formations = forms(innerWidth < 720);
      sectionElements = Array.from(document.querySelectorAll<HTMLElement>("main section[data-scene]"));
    };
    const target = () => {
      const middle = innerHeight * 0.5;
      let index = 0;
      for (let i = 0; i < sectionElements.length; i += 1) if (sectionElements[i].getBoundingClientRect().top <= middle) index = i;
      if (!sectionElements.length) return 0;
      if (index >= formations.length - 1) return formations.length - 1;
      const rect = sectionElements[index].getBoundingClientRect();
      return index + smooth(((middle - rect.top) / rect.height - 0.3) / 0.7);
    };
    const formAt = (position: number): FormAt => {
      const x = Math.max(0, Math.min(formations.length - 1, position));
      const index = Math.floor(x);
      return { A: formations[index], B: formations[Math.min(index + 1, formations.length - 1)], k: smooth(x - index) };
    };
    const bezier = (points: number[], q: number) => {
      const a = 1 - q;
      return [a ** 3 * points[0] + 3 * a * a * q * points[2] + 3 * a * q * q * points[4] + q ** 3 * points[6], a ** 3 * points[1] + 3 * a * a * q * points[3] + 3 * a * q * q * points[5] + q ** 3 * points[7]];
    };
    const controls = (form: FormAt, ribbon: number) => form.A.r[ribbon].map((point, index) => lerp(point, form.B.r[ribbon][index], form.k));

    resize();
    const start = target();
    const head = [start, start, start];
    const tail = [start, start, start];
    const headRates = [2.4, 2.0, 1.7];
    const tailRates = [1.8, 1.5, 1.25];
    const strands = 26;
    const points = 90;
    const chunk = 6;

    const draw = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduced) time += delta;
      const scene = document.body.dataset.scene || "blanco";
      const targetPalette = PALETTE[scene] || PALETTE.blanco;
      for (let i = 0; i < 2; i += 1) for (let j = 0; j < 4; j += 1) current[i][j] = lerp(current[i][j], targetPalette[i][j], reduced ? 1 : 1 - Math.exp(-delta * 3));
      const targetPosition = target();
      for (let ribbon = 0; ribbon < 3; ribbon += 1) {
        if (reduced) head[ribbon] = tail[ribbon] = targetPosition;
        else {
          head[ribbon] = lerp(head[ribbon], targetPosition, 1 - Math.exp(-delta * headRates[ribbon]));
          tail[ribbon] = lerp(tail[ribbon], targetPosition, 1 - Math.exp(-delta * tailRates[ribbon]));
        }
      }
      const width = canvas.width;
      const height = canvas.height;
      context.clearRect(0, 0, width, height);
      const shadow = current[0];
      const highlight = current[1];
      for (let ribbon = 0; ribbon < 3; ribbon += 1) {
        const headForm = formAt(head[ribbon]);
        const tailForm = formAt(tail[ribbon]);
        const headControls = controls(headForm, ribbon);
        const tailControls = controls(tailForm, ribbon);
        const opacity = lerp(lerp(headForm.A.o, headForm.B.o, headForm.k), lerp(tailForm.A.o, tailForm.B.o, tailForm.k), 0.5);
        let ribbonWidth = lerp(lerp(headForm.A.w, headForm.B.w, headForm.k), lerp(tailForm.A.w, tailForm.B.w, tailForm.k), 0.5) * height;
        const stir = Math.min(1, Math.abs(head[ribbon] - tail[ribbon]) * 3);
        ribbonWidth *= 1 - 0.3 * stir;
        const center: number[][] = [];
        for (let point = 0; point <= points; point += 1) {
          const q = point / points;
          const mix = smooth(q) * 0.7;
          const near = bezier(headControls, q);
          const far = bezier(tailControls, q);
          const wave = Math.sin(q * Math.PI * (2.0 + ribbon * 0.4) + time * (0.45 + ribbon * 0.12) + ribbon * 2.1) * (0.010 + 0.008 * stir) * height;
          center.push([lerp(near[0], far[0], mix) * width, lerp(near[1], far[1], mix) * height, wave]);
        }
        const base = center.map(([x, y]) => [x, y]);
        for (let point = 0; point <= points; point += 1) {
          const before = base[Math.max(0, point - 4)];
          const after = base[Math.min(points, point + 4)];
          const x = after[0] - before[0];
          const y = after[1] - before[1];
          const length = Math.hypot(x, y) || 1;
          const normalX = -y / length;
          const normalY = x / length;
          center[point] = [base[point][0] + normalX * center[point][2], base[point][1] + normalY * center[point][2], normalX, normalY, Math.atan2(y, x)];
        }
        context.globalAlpha = opacity;
        const order = Array.from({ length: strands }, (_, strand) => strand).sort((a, b) => Math.abs(b - (strands - 1) / 2) - Math.abs(a - (strands - 1) / 2));
        const gap = (ribbonWidth * 2) / (strands - 1);
        for (const strand of order) {
          const u = (strand / (strands - 1)) * 2 - 1;
          const cylinder = Math.sqrt(Math.max(0, 1 - u * u));
          for (let point = 0; point < points; point += chunk) {
            const middle = center[Math.min(points, point + (chunk >> 1))];
            const light = 0.5 + 0.5 * Math.cos(middle[4] - 0.6 + Math.sin(time * 0.25 + ribbon * 1.7) * 0.35);
            const shade = Math.min(1, cylinder ** 0.9 * (0.35 + 0.65 * light));
            let color = [lerp(shadow[0], highlight[0], shade), lerp(shadow[1], highlight[1], shade), lerp(shadow[2], highlight[2], shade)];
            const fraction = Math.exp(-(((Math.abs(u) - 0.5) / 0.22) ** 2)) * light * 0.32 + 0.06;
            color = [lerp(color[0], TINTS[ribbon][0], fraction), lerp(color[1], TINTS[ribbon][1], fraction), lerp(color[2], TINTS[ribbon][2], fraction)];
            const alpha = lerp(shadow[3], highlight[3], shade);
            context.beginPath();
            for (let index = point; index <= Math.min(points, point + chunk); index += 1) {
              const value = center[index];
              const x = value[0] + value[2] * u * ribbonWidth;
              const y = value[1] + value[3] * u * ribbonWidth;
              if (index === point) context.moveTo(x, y);
              else context.lineTo(x, y);
            }
            context.strokeStyle = `rgba(${color[0] | 0},${color[1] | 0},${color[2] | 0},${alpha.toFixed(3)})`;
            context.lineWidth = gap * 2.2 + 0.8;
            context.lineCap = "butt";
            context.lineJoin = "round";
            context.stroke();
          }
        }
      }
      context.globalAlpha = 1;
      if (!reduced) animationFrame = requestAnimationFrame(draw);
    };
    const redraw = () => {
      last = performance.now();
      draw(last);
    };

    addEventListener("resize", resize);
    if (reduced) {
      addEventListener("scroll", redraw, { passive: true });
      addEventListener("resize", redraw);
    }
    animationFrame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrame);
      removeEventListener("resize", resize);
      if (reduced) {
        removeEventListener("scroll", redraw);
        removeEventListener("resize", redraw);
      }
    };
  }, []);

  return <canvas id="silk" ref={ref} aria-hidden="true" />;
}
