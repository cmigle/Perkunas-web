import { useEffect, useRef } from 'react';

/**
 * Motorsport background:
 *   - Deep carbon gradient
 *   - Faint racing sector grid (timing-tower coded)
 *   - Slow diagonal wash drift
 *   - Occasional realistic lightning — branching, multi-flash, blue-white
 *   - Subtle tick marks along the edges like a timing marshal display
 *
 * Pure canvas — ~1-2% CPU.
 */
export default function DotWaveBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    const start = performance.now();

    // ---------- Lightning strike state machine ----------
    // A "strike" is a sequence of 2–5 "flashes" separated by ~40–90ms gaps.
    // Each flash has: a main branching bolt + a flash envelope (intensity curve).
    let strike = null;           // active hero strike, or null
    let nextStrikeAt = 4000 + Math.random() * 8000;

    // Distant-lightning pool: many tiny, faint, short-lived bolts scattered
    // across the background. They read as far-off storm activity, not the
    // main Perkūnas strike.
    const distant = [];          // active distant bolts
    let nextDistantAt = 800 + Math.random() * 1800;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    // Build a lightning tree: a main channel with recursive branches.
    // Returns { segments: [{x1,y1,x2,y2,depth}], bbox }
    function buildLightning(x0, y0, x1, y1) {
      const segments = [];

      // Recursive subdivision — classic midpoint-displacement lightning.
      function subdivide(ax, ay, bx, by, depth, jitter) {
        if (depth === 0) {
          segments.push({ x1: ax, y1: ay, x2: bx, y2: by, depth });
          return;
        }
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2;
        // Perpendicular jitter — grows as we go down (more wander near ground)
        const dx = bx - ax;
        const dy = by - ay;
        const len = Math.hypot(dx, dy);
        const nx = -dy / len;
        const ny = dx / len;
        const offset = (Math.random() - 0.5) * jitter;
        const jmx = mx + nx * offset;
        const jmy = my + ny * offset;

        subdivide(ax, ay, jmx, jmy, depth - 1, jitter * 0.55);
        subdivide(jmx, jmy, bx, by, depth - 1, jitter * 0.55);

        // Branch off 30% of the time at interior segments (not root).
        // Branches fork to one side and terminate after a short fractal.
        if (depth > 1 && Math.random() < 0.32) {
          const branchLen = len * (0.25 + Math.random() * 0.35);
          const angle = Math.atan2(dy, dx) + (Math.random() < 0.5 ? -1 : 1) * (0.5 + Math.random() * 0.5);
          const tx = jmx + Math.cos(angle) * branchLen;
          const ty = jmy + Math.sin(angle) * branchLen;
          subdivideBranch(jmx, jmy, tx, ty, depth - 1, jitter * 0.5);
        }
      }

      // Branches are marked with higher "depth" value so they render thinner.
      function subdivideBranch(ax, ay, bx, by, depth, jitter) {
        if (depth === 0) {
          segments.push({ x1: ax, y1: ay, x2: bx, y2: by, depth: 9, branch: true });
          return;
        }
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2;
        const dx = bx - ax;
        const dy = by - ay;
        const len = Math.hypot(dx, dy);
        const nx = -dy / len;
        const ny = dx / len;
        const offset = (Math.random() - 0.5) * jitter;
        const jmx = mx + nx * offset;
        const jmy = my + ny * offset;
        subdivideBranch(ax, ay, jmx, jmy, depth - 1, jitter * 0.5);
        subdivideBranch(jmx, jmy, bx, by, depth - 1, jitter * 0.5);
      }

      subdivide(x0, y0, x1, y1, 6, Math.max(80, h * 0.18));
      return segments;
    }

    // Build a small, mostly-straight distant bolt (less fractal than the hero).
    function buildDistantBolt(cx, cy, length, angle) {
      const endX = cx + Math.cos(angle) * length;
      const endY = cy + Math.sin(angle) * length;
      const segments = [];
      function subdivide(ax, ay, bx, by, depth, jitter) {
        if (depth === 0) {
          segments.push({ x1: ax, y1: ay, x2: bx, y2: by });
          return;
        }
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2;
        const dx = bx - ax;
        const dy = by - ay;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const offset = (Math.random() - 0.5) * jitter;
        const jmx = mx + nx * offset;
        const jmy = my + ny * offset;
        subdivide(ax, ay, jmx, jmy, depth - 1, jitter * 0.55);
        subdivide(jmx, jmy, bx, by, depth - 1, jitter * 0.55);
      }
      // 4 levels of subdivision — just enough shape, not much wander
      subdivide(cx, cy, endX, endY, 4, length * 0.18);
      return segments;
    }

    function scheduleDistantBolt(t) {
      // Random position on-screen (slight bias upward — bolts come from the sky)
      const cx = Math.random() * w;
      const cy = Math.random() * h * 0.7;
      const length = 40 + Math.random() * 90;       // short
      const angle = Math.PI / 2 + (Math.random() - 0.5) * 1.6; // roughly downward
      distant.push({
        segments: buildDistantBolt(cx, cy, length, angle),
        startedAt: t,
        dur: 40 + Math.random() * 60,               // bright peak
        afterglow: 60 + Math.random() * 140,        // short fade
        peak: 0.18 + Math.random() * 0.22           // capped well below hero strikes
      });
    }

    function scheduleStrike(t) {
      // Starting point at top of the viewport, random horizontal.
      const sx = Math.random() * w;
      const sy = -20;
      // End point somewhere near the lower half — slight horizontal wander.
      const ex = sx + (Math.random() - 0.5) * w * 0.5;
      const ey = h * (0.6 + Math.random() * 0.4);

      // 2–4 flashes, each with different minor bolt geometry (return strokes
      // use the ionized channel so they largely overlap, but jitter slightly)
      const base = buildLightning(sx, sy, ex, ey);
      const flashCount = 2 + Math.floor(Math.random() * 3); // 2..4
      const flashes = [];
      let tCursor = 0;
      for (let i = 0; i < flashCount; i++) {
        // First flash is brightest. Return strokes are dimmer but still strong.
        const peak = i === 0 ? 1.0 : 0.55 + Math.random() * 0.3;
        // Duration of visible flash (~60ms bright peak + ~140ms afterglow)
        const dur = 60 + Math.random() * 100;
        const afterglow = 120 + Math.random() * 180;
        flashes.push({
          startAt: tCursor,
          peakDur: dur,
          afterglow,
          peak,
          // Return strokes reuse the channel but jitter branches slightly
          segments: i === 0
            ? base
            : base.map((s) => ({
                ...s,
                x1: s.x1 + (Math.random() - 0.5) * 3,
                y1: s.y1 + (Math.random() - 0.5) * 3,
                x2: s.x2 + (Math.random() - 0.5) * 3,
                y2: s.y2 + (Math.random() - 0.5) * 3
              }))
        });
        tCursor += dur + afterglow + 30 + Math.random() * 70;
      }

      strike = {
        flashes,
        startedAt: t,
        totalDur: tCursor,
        // Overall "sky flash" envelope — a very brief page-wide brightening
        skyFlash: true
      };
    }

    // Compute current flash intensity (0..1) for a strike at elapsed ms.
    function strikeIntensity(sk, elapsed) {
      let intensity = 0;
      let active = null;
      for (const f of sk.flashes) {
        const local = elapsed - f.startAt;
        if (local < 0) continue;
        if (local > f.peakDur + f.afterglow) continue;
        let v;
        if (local < f.peakDur) {
          // Sharp rise, held near peak
          v = Math.min(1, local / 18);
        } else {
          // Exponential afterglow
          const fade = (local - f.peakDur) / f.afterglow;
          v = Math.max(0, (1 - fade) * (1 - fade));
        }
        v *= f.peak;
        if (v > intensity) { intensity = v; active = f; }
      }
      return { intensity, active };
    }

    function draw(ts) {
      const t = ts - start;
      ctx.clearRect(0, 0, w, h);

      // 1. Deep carbon gradient base
      const grad = ctx.createLinearGradient(0, 0, w * 0.7, h);
      grad.addColorStop(0, '#0A0C11');
      grad.addColorStop(0.55, '#06080C');
      grad.addColorStop(1, '#040507');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 2. Warm garage pool — bottom-left (brand orange)
      const rg = ctx.createRadialGradient(w * 0.15, h * 0.88, 0, w * 0.15, h * 0.88, Math.max(w, h) * 0.55);
      rg.addColorStop(0, 'rgba(250,143,49,0.08)');
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);

      // 3. Storm pool — top-right, warm thunder yellow
      const rg2 = ctx.createRadialGradient(w * 0.85, h * 0.1, 0, w * 0.85, h * 0.1, Math.max(w, h) * 0.5);
      rg2.addColorStop(0, 'rgba(253,216,53,0.045)');
      rg2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg2;
      ctx.fillRect(0, 0, w, h);

      // 4. Sector grid — faint rectangular lines (timing-tower feel)
      ctx.strokeStyle = 'rgba(255,255,255,0.022)';
      ctx.lineWidth = 1;
      const CELL = 80;
      const drift = (t * 0.004) % CELL;
      ctx.beginPath();
      for (let x = -drift; x < w + CELL; x += CELL) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += CELL) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Every 5th vertical line gets a stronger accent — like sector markers
      ctx.strokeStyle = 'rgba(250,143,49,0.04)';
      ctx.beginPath();
      for (let x = -drift; x < w + CELL; x += CELL * 5) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
      }
      ctx.stroke();

      // 5. Edge ticks — timing-tower style marshal ticks along left + right
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      const TICK = 18;
      const tickDrift = (t * 0.03) % TICK;
      ctx.beginPath();
      for (let y = -tickDrift; y < h + TICK; y += TICK) {
        ctx.moveTo(0, y); ctx.lineTo(6, y);
        ctx.moveTo(w - 6, y); ctx.lineTo(w, y);
      }
      ctx.stroke();

      // 6a. Distant lightning — small, faint bolts flickering across the background.
      // Spawned frequently (every 0.8–2.6s), lifespans short, low opacity.
      if (t > nextDistantAt) {
        scheduleDistantBolt(t);
        nextDistantAt = t + 800 + Math.random() * 1800;
      }
      if (distant.length) {
        for (let i = distant.length - 1; i >= 0; i--) {
          const b = distant[i];
          const local = t - b.startedAt;
          if (local > b.dur + b.afterglow) {
            distant.splice(i, 1);
            continue;
          }
          let v;
          if (local < b.dur) {
            v = Math.min(1, local / 14);
          } else {
            const fade = (local - b.dur) / b.afterglow;
            v = Math.max(0, (1 - fade) * (1 - fade));
          }
          const a = v * b.peak;
          if (a <= 0.002) continue;

          // Two passes for distant bolts — just a thin warm halo + a white core.
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = `rgba(253,216,53,${a * 0.35})`;
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          for (const s of b.segments) { ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); }
          ctx.stroke();
          ctx.strokeStyle = `rgba(255,240,190,${a * 0.85})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          for (const s of b.segments) { ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); }
          ctx.stroke();
        }
      }

      // 6b. Hero lightning — realistic branching + multi-flash
      if (!strike && t > nextStrikeAt) {
        scheduleStrike(t);
      }
      if (strike) {
        const elapsed = t - strike.startedAt;
        if (elapsed > strike.totalDur + 200) {
          strike = null;
          nextStrikeAt = t + 6000 + Math.random() * 14000;
        } else {
          const { intensity, active } = strikeIntensity(strike, elapsed);

          if (intensity > 0.001 && active) {
            // Sky flash — briefly brighten the whole frame when the strike peaks
            if (intensity > 0.3) {
              const sky = (intensity - 0.3) * 0.22; // max ~0.15 alpha
              ctx.fillStyle = `rgba(255,235,170,${sky})`;
              ctx.fillRect(0, 0, w, h);
            }

            // Draw the bolt in three passes: wide soft halo, medium glow, bright core.
            const segs = active.segments;

            // PASS 1: outer halo (warm yellow corona)
            ctx.strokeStyle = `rgba(253,216,53,${intensity * 0.26})`;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            for (const s of segs) {
              const wide = s.branch ? 5 : 14;
              ctx.lineWidth = wide;
              ctx.beginPath();
              ctx.moveTo(s.x1, s.y1);
              ctx.lineTo(s.x2, s.y2);
              ctx.stroke();
            }

            // PASS 2: mid glow (warm white-yellow)
            ctx.strokeStyle = `rgba(255,236,170,${intensity * 0.6})`;
            for (const s of segs) {
              const wide = s.branch ? 2 : 5;
              ctx.lineWidth = wide;
              ctx.beginPath();
              ctx.moveTo(s.x1, s.y1);
              ctx.lineTo(s.x2, s.y2);
              ctx.stroke();
            }

            // PASS 3: hot core (near-white)
            ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, intensity * 1.1)})`;
            for (const s of segs) {
              const wide = s.branch ? 0.9 : 1.6;
              ctx.lineWidth = wide;
              ctx.beginPath();
              ctx.moveTo(s.x1, s.y1);
              ctx.lineTo(s.x2, s.y2);
              ctx.stroke();
            }
          }
        }
      }

      // 7. Vignette — keeps focus on content (drawn last so it sits over flash too, dimming edges)
      const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.75);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
