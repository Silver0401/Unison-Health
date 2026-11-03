"use client";
import { useEffect, useRef } from "react";

export default function SilkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const draw = (time: number) => {
      canvas.width = Math.round(innerWidth * 0.75);
      canvas.height = Math.round(innerHeight * 0.75);
      const scene = document.body.dataset.scene || "blanco";
      const colors: Record<string, string[]> = { blanco: ["rgba(118,126,152,.35)", "rgba(252,253,255,.7)"], niebla: ["rgba(112,122,150,.35)", "rgba(255,255,255,.7)"], cobalto: ["rgba(10,24,96,.35)", "rgba(205,220,255,.7)"], tinta: ["rgba(4,9,24,.35)", "rgba(125,165,245,.7)"] };
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[data-scene]"));
      const active = Math.max(0, sections.findIndex((section) => section.getBoundingClientRect().bottom > innerHeight * .5));
      context.clearRect(0, 0, canvas.width, canvas.height);
      [0, 1, 2].forEach((ribbon) => {
        context.beginPath();
        for (let x = -40; x <= canvas.width + 40; x += 12) {
          const progress = x / canvas.width;
          const y = canvas.height * (.88 - active * .035) + ribbon * 12 + Math.sin(progress * 8 + (reduced ? 0 : time / 1500) + ribbon) * 28;
          x < 0 ? context.moveTo(x, y) : context.lineTo(x, y);
        }
        context.strokeStyle = colors[scene][ribbon % 2];
        context.lineWidth = 18;
        context.stroke();
      });
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    const redraw = () => reduced && draw(performance.now());
    addEventListener("resize", redraw);
    addEventListener("scroll", redraw, { passive: true });
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", redraw); removeEventListener("scroll", redraw); };
  }, []);
  return <canvas id="silk" ref={ref} aria-hidden="true" />;
}
