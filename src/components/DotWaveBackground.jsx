import { useEffect, useRef } from 'react';

/**
 * Matte dark background:
 * - animated dot-matrix wave (Nothing-phone-style pixel field)
 * - two slow drifting gradient orbs for soft color
 *
 * Pure canvas for performance. ~2% CPU on a mid laptop.
 */
export default function DotWaveBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    let dots = [];
    const SPACING = 26;     // distance between dots (css px)
    const DOT_RADIUS = 1.1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // rebuild dot grid
      dots = [];
      for (let y = SPACING; y < h - SPACING / 2; y += SPACING) {
        for (let x = SPACING; x < w - SPACING / 2; x += SPACING) {
          dots.push({ x, y, bx: x, by: y });
        }
      }
    }

    // Two drifting "orbs" (Nothing-style soft gradient spheres)
    const orbs = [
      { x: 0.18, y: 0.22, r: 340, vx: 0.00018, vy: 0.00011, color: 'rgba(250,143,49,0.18)' },
      { x: 0.82, y: 0.78, r: 380, vx: -0.00014, vy: -0.00009, color: 'rgba(250,105,38,0.12)' },
      { x: 0.5,  y: 0.1,  r: 260, vx: 0.0001,   vy: 0.00015, color: 'rgba(250,143,49,0.07)' }
    ];

    function draw(ts) {
      ctx.clearRect(0, 0, w, h);

      // 1. Base matte tone — warm ink, not pure black
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#0A0809');
      grad.addColorStop(1, '#070506');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 2. Orbs — soft radial gradients (matte, no sharp edges)
      for (const o of orbs) {
        o.x += o.vx; o.y += o.vy;
        if (o.x < 0.1 || o.x > 0.9) o.vx *= -1;
        if (o.y < 0.1 || o.y > 0.9) o.vy *= -1;

        const cx = o.x * w, cy = o.y * h;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
        g.addColorStop(0, o.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Dot-matrix wave
      const t = ts * 0.0008;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseR2 = 180 * 180;

      for (const d of dots) {
        // gentle wave displacement
        const wave =
          Math.sin(d.bx * 0.018 + t) * 2.5 +
          Math.cos(d.by * 0.022 + t * 1.2) * 2.5;
        let px = d.bx;
        let py = d.by + wave;

        // mouse push
        const dx = px - mx;
        const dy = py - my;
        const d2 = dx * dx + dy * dy;
        let a = 0.16;
        if (d2 < mouseR2) {
          const f = 1 - d2 / mouseR2;
          px += dx * f * 0.06;
          py += dy * f * 0.06;
          a = 0.16 + f * 0.55; // brighter near mouse
        }

        ctx.fillStyle = a > 0.4
          ? `rgba(250,143,49,${a})`
          : `rgba(255,255,255,${a * 0.55})`;
        ctx.beginPath();
        ctx.arc(px, py, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => resize();
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
    />
  );
}
