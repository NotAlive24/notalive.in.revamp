import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Deterministic generators ──────────────────────────────────────────────
const createMarineSnow = (count) =>
  Array.from({ length: count }, (_, i) => ({
    left: `${(i * 37 + 11) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    size: `${0.8 + (i % 5) * 0.55}px`,
    opacity: 0.06 + (i % 7) * 0.025,
    color:
      i % 3 === 0
        ? "rgba(180,245,255,0.7)"
        : i % 3 === 1
        ? "rgba(140,220,255,0.5)"
        : "rgba(220,255,255,0.6)",
  }));

const createBubbles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    left: `${(i * 31 + 5) % 98}%`,
    size: `${3 + (i % 6) * 2.5}px`,
  }));

const createFish = () => [
  { cls: "fish-one",   top: "32%", scale: 0.52, dur: 33, delay: -3,   dir:  1, opacity: 0.52 },
  { cls: "fish-two",   top: "47%", scale: 0.36, dur: 45, delay: -15,  dir: -1, opacity: 0.36 },
  { cls: "fish-three", top: "60%", scale: 0.44, dur: 39, delay: -22,  dir:  1, opacity: 0.44 },
  { cls: "fish-four",  top: "70%", scale: 0.29, dur: 52, delay: -8,   dir: -1, opacity: 0.30 },
  { cls: "fish-five",  top: "41%", scale: 0.26, dur: 58, delay: -35,  dir:  1, opacity: 0.27 },
  { cls: "fish-six",   top: "56%", scale: 0.33, dur: 47, delay: -19,  dir: -1, opacity: 0.33 },
];

const createCausticCells = (count) =>
  Array.from({ length: count }, (_, i) => ({
    cx: (i * 67 + 23) % 300,
    cy: (i * 43 + 17) % 200,
    rx: 4 + (i % 5) * 3.5,
    ry: 3 + (i % 4) * 2.5,
    rotation: (i * 41) % 180,
    opacity: 0.12 + (i % 6) * 0.06,
    channel: i % 3,
  }));

const WaterSurface = () => {
  const sceneRef = useRef(null);
  const marineSnow   = useMemo(() => createMarineSnow(120), []);
  const bubbles      = useMemo(() => createBubbles(28), []);
  const fish         = useMemo(() => createFish(), []);
  const causticCells = useMemo(() => createCausticCells(32), []);

  useGSAP(() => {
    const scene = sceneRef.current;
    const page  = document.querySelector(".ocean-page");
    const hero  = document.querySelector(".hero-inner");
    if (!scene || !page) return;

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(page, {
      "--water-height":        "10svh",
      "--sky-opacity":         1,
      "--surface-opacity":     1,
      "--surface-y":           "0px",
      "--surface-scale":       1,
      "--underwater-strength": 0,
      "--deep-strength":       0,
      "--ray-strength":        0,
      "--fish-strength":       0,
      "--caustics-strength":   0.18,
      "--snell-opacity":       0,
      "--scatter-opacity":     0,
    });

    // Dive on scroll
    const introDive = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-panel",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    introDive
      .to(page, {
        "--water-height":        "100svh",
        "--sky-opacity":         0,
        "--surface-opacity":     0.38,
        "--surface-y":           "-130px",
        "--surface-scale":       0.72,
        "--underwater-strength": 1,
        "--ray-strength":        0.72,
        "--fish-strength":       1,
        "--caustics-strength":   0.55,
        "--snell-opacity":       0.82,
        "--scatter-opacity":     1,
        ease: "none",
      }, 0)
      .to(".surface-wrap", { filter: "blur(1.4px)", ease: "none" }, 0.2);

    if (hero) {
      introDive.to(hero, {
        y: -160, opacity: 0.1, scale: 0.88, filter: "blur(1.4px)", ease: "none",
      }, 0.06);
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: page, start: "top top", end: "bottom bottom",
        scrub: 1.4, invalidateOnRefresh: true,
      },
    }).to(page, { "--deep-strength": 1, ease: "none" });

    if (rm) return;

    // Surface wave
    gsap.to(".surface-svg", {
      y: 18, scaleY: 1.06, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to("#waterNoise", {
      attr: { baseFrequency: "0.012 0.044" },
      duration: 4.4, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to("#waterDisplace", {
      attr: { scale: 24 },
      duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    // Glare sweeps
    gsap.to(".surface-glare",   { xPercent:  32, duration: 8,  repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".surface-glare-2", { xPercent: -25, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Foam
    gsap.to(".foam-line-one",   { xPercent: -38, duration:  9, repeat: -1, ease: "none" });
    gsap.to(".foam-line-two",   { xPercent:  30, duration: 12, repeat: -1, ease: "none" });
    gsap.to(".foam-line-three", { xPercent: -22, duration: 16, repeat: -1, ease: "none" });

    // Snell's window breathe
    gsap.to(".snell-window",  { scale: 1.04, duration: 5,  repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".snell-corona",  { opacity: 0.38, scale: 1.08, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Chromatic caustics — each color channel drifts independently
    gsap.to(".caustics-r", { backgroundPosition: "860px 520px",  duration: 19, repeat: -1, ease: "none" });
    gsap.to(".caustics-g", { backgroundPosition: "-720px 440px", duration: 24, repeat: -1, ease: "none" });
    gsap.to(".caustics-b", { backgroundPosition: "580px -380px", duration: 29, repeat: -1, ease: "none" });

    // SVG caustic cells morph
    gsap.utils.toArray(".caustic-cell", scene).forEach((el, i) => {
      gsap.to(el, {
        attr: { rx: `${3 + (i % 5) * 4}`, ry: `${2 + (i % 4) * 3}` },
        opacity: gsap.utils.random(0.05, 0.32),
        duration: gsap.utils.random(1.8, 4.2),
        repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.09,
      });
    });

    // God rays
    gsap.to(".light-ray", {
      yPercent: -18, opacity: 0.28, duration: 6.2,
      repeat: -1, yoyo: true, stagger: 0.7, ease: "sine.inOut",
    });

    // Scatter volume haze
    gsap.to(".scatter-haze", {
      y: -30, opacity: 0.42, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(".scatter-vol-a", {
      xPercent: 8, opacity: 0.28, duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(".scatter-vol-b", {
      xPercent: -6, opacity: 0.22, duration: 17, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    // Bubbles
    gsap.utils.toArray(".bubble", scene).forEach((b, i) => {
      gsap.fromTo(b,
        { y: gsap.utils.random(180, 820), x: gsap.utils.random(-20, 20), opacity: 0, scale: gsap.utils.random(0.4, 1.2) },
        { y: gsap.utils.random(-900, -280), x: gsap.utils.random(-80, 80),
          opacity: gsap.utils.random(0.14, 0.48), duration: gsap.utils.random(10, 24),
          delay: i * 0.26, repeat: -1, ease: "power1.inOut" }
      );
    });

    // Marine snow drift
    gsap.utils.toArray(".marine-particle", scene).forEach((p) => {
      gsap.to(p, {
        x: gsap.utils.random(-42, 42), y: gsap.utils.random(-52, 52),
        opacity: gsap.utils.random(0.06, 0.34),
        duration: gsap.utils.random(5, 13), repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    });

    // Bioluminescence pulse
    gsap.utils.toArray(".bio-particle", scene).forEach((p, i) => {
      gsap.to(p, {
        opacity: gsap.utils.random(0.1, 0.8),
        scale: gsap.utils.random(0.5, 2.2),
        duration: gsap.utils.random(2, 5),
        repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.18,
      });
    });

    // Fish swim
    gsap.utils.toArray(".fish-unit", scene).forEach((el) => {
      const dir = Number(el.dataset.direction);
      const dur = Number(el.dataset.duration);
      const dly = Number(el.dataset.delay);
      gsap.fromTo(el,
        { x: dir === 1 ? "-20vw" : "120vw" },
        { x: dir === 1 ? "120vw" : "-20vw", duration: dur, delay: dly, repeat: -1, ease: "none" }
      );
      const bob  = el.querySelector(".fish-bob");
      const tail = el.querySelector(".fish-tail");
      if (bob)  gsap.to(bob,  { y: gsap.utils.random(-11, 11), rotation: gsap.utils.random(-2.5, 2.5), duration: gsap.utils.random(2.9, 5.8), repeat: -1, yoyo: true, ease: "sine.inOut" });
      if (tail) gsap.to(tail, { transformOrigin: "67px 18px", rotate: dir === 1 ? 9 : -9, duration: gsap.utils.random(0.32, 0.54), repeat: -1, yoyo: true, ease: "sine.inOut" });
    });

    // Resize refresh
    let rTween;
    const doRefresh = () => { if (rTween) rTween.kill(); rTween = gsap.delayedCall(0.15, () => ScrollTrigger.refresh()); };
    const ro = new ResizeObserver(doRefresh);
    ro.observe(document.body);
    ro.observe(page);
    window.addEventListener("load",   doRefresh);
    window.addEventListener("resize", doRefresh);
    return () => {
      if (rTween) rTween.kill();
      ro.disconnect();
      window.removeEventListener("load",   doRefresh);
      window.removeEventListener("resize", doRefresh);
    };
  }, { scope: sceneRef });

  return (
    <div ref={sceneRef} className="ocean-scene" aria-hidden="true">

      {/* SKY */}
      <div className="sky-layer">
        <div className="sun" />
        <div className="sun-corona" />
        <div className="horizon-haze" />
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
        <div className="cloud cloud-c" />
      </div>

      {/* WATER */}
      <div className="water-layer">
        <div className="water-volume">

          {/* Subsurface scatter – bright cyan near surface */}
          <div className="subsurface-scatter" />
          <div className="scatter-haze" />

          {/* Depth gradients */}
          <div className="underwater-gradient" />
          <div className="underwater-haze" />

          {/* Snell's window – circle of sky seen from below */}
          <div className="snell-corona" />
          <div className="snell-window" />
          <div className="snell-inner" />

          {/* Chromatic caustics – R/G/B channels offset for realism */}
          <div className="caustics-layer caustics-r" />
          <div className="caustics-layer caustics-g" />
          <div className="caustics-layer caustics-b" />

          {/* SVG caustic cell mesh */}
          <svg className="caustics-svg" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="causticBlur">
                <feGaussianBlur stdDeviation="1.8" />
              </filter>
            </defs>
            <g filter="url(#causticBlur)" opacity="0.7">
              {causticCells.map((c, i) => (
                <ellipse
                  key={`cc-${i}`}
                  className="caustic-cell"
                  cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
                  transform={`rotate(${c.rotation} ${c.cx} ${c.cy})`}
                  fill="none"
                  stroke={
                    c.channel === 0
                      ? "rgba(255,255,255,0.85)"
                      : c.channel === 1
                      ? "rgba(120,255,240,0.75)"
                      : "rgba(80,160,255,0.65)"
                  }
                  strokeWidth="1.2"
                  opacity={c.opacity}
                />
              ))}
            </g>
          </svg>

          {/* Volumetric god rays */}
          <div className="light-rays">
            <span className="light-ray ray-a" />
            <span className="light-ray ray-b" />
            <span className="light-ray ray-c" />
            <span className="light-ray ray-d" />
            <span className="light-ray ray-e" />
            <span className="light-ray ray-f" />
          </div>

          {/* Volume scatter between rays */}
          <div className="scatter-vol scatter-vol-a" />
          <div className="scatter-vol scatter-vol-b" />

          {/* Red-light absorption at depth */}
          <div className="depth-absorb" />

          {/* Marine snow */}
          <div className="marine-snow">
            {marineSnow.map((p, i) => (
              <span key={`mp-${i}`} className="marine-particle" style={{
                left: p.left, top: p.top, width: p.size, height: p.size,
                opacity: p.opacity, background: p.color,
              }} />
            ))}
          </div>

          {/* Bioluminescent deep particles */}
          <div className="bio-field">
            {Array.from({ length: 18 }, (_, i) => (
              <span key={`bio-${i}`} className="bio-particle" style={{
                left: `${(i * 43 + 7) % 98}%`,
                top:  `${50 + (i * 31) % 48}%`,
                width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
                opacity: 0,
              }} />
            ))}
          </div>

          {/* Bubbles */}
          <div className="bubble-field">
            {bubbles.map((b, i) => (
              <span key={`bbl-${i}`} className="bubble" style={{ left: b.left, width: b.size, height: b.size }} />
            ))}
          </div>

          {/* Fish */}
          <div className="fish-field">
            {fish.map((f, i) => (
              <div key={`fish-${i}`} className={`fish-unit ${f.cls}`}
                data-direction={f.dir} data-duration={f.dur} data-delay={f.delay}
                style={{ top: f.top, opacity: f.opacity, "--fish-scale": f.scale, "--fish-flip": f.dir === 1 ? -1 : 1 }}>
                <div className="fish-scale">
                  <div className="fish-bob">
                    <svg className="fish-swim" viewBox="0 0 88 36" aria-hidden="true">
                      <path className="fish-tail" d="M65 18 C77 7 84 6 87 8 C82 14 82 22 87 28 C82 31 76 29 65 18 Z" />
                      <path className="fish-body" d="M6 18 C18 5 45 2 67 18 C45 34 18 31 6 18 Z" />
                      <path className="fish-belly" d="M17 20 C31 27 49 27 62 18 C48 30 28 31 17 20 Z" />
                      <path className="fish-fin"  d="M37 19 C31 22 28 27 29 31 C36 29 42 25 45 20 Z" />
                      <circle className="fish-eye" cx="18" cy="15" r="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* SURFACE */}
        <div className="surface-wrap">
          <svg className="surface-svg" viewBox="0 0 1440 260" preserveAspectRatio="none">
            <defs>
              <filter id="waterDistortion" x="-12%" y="-50%" width="124%" height="200%">
                <feTurbulence id="waterNoise" type="fractalNoise"
                  baseFrequency="0.008 0.032" numOctaves="4" seed="11" result="noise" />
                <feDisplacementMap id="waterDisplace" in="SourceGraphic" in2="noise"
                  scale="16" xChannelSelector="R" yChannelSelector="G" result="d" />
                <feGaussianBlur in="d" stdDeviation="0.22" />
              </filter>
              <linearGradient id="surfaceBack" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#e8ffff" stopOpacity="0.28" />
                <stop offset="40%"  stopColor="#5de0ff" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#006fa8" stopOpacity="0"   />
              </linearGradient>
              <linearGradient id="surfaceMid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#dfffff" stopOpacity="0.65" />
                <stop offset="35%"  stopColor="#42d8ff" stopOpacity="0.48" />
                <stop offset="100%" stopColor="#007bb8" stopOpacity="0"   />
              </linearGradient>
              <linearGradient id="surfaceFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.97" />
                <stop offset="22%"  stopColor="#a8f5ff" stopOpacity="0.82" />
                <stop offset="52%"  stopColor="#18b8f0" stopOpacity="0.54" />
                <stop offset="100%" stopColor="#007aac" stopOpacity="0"   />
              </linearGradient>
              <linearGradient id="surfaceSpec" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="transparent" />
                <stop offset="22%"  stopColor="rgba(255,255,255,0.14)" />
                <stop offset="46%"  stopColor="rgba(240,255,255,0.94)" />
                <stop offset="64%"  stopColor="rgba(180,248,255,0.42)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <g filter="url(#waterDistortion)">
              <path fill="url(#surfaceBack)" opacity="0.70"
                d="M0,118 C110,96 215,148 355,120 C500,92 620,142 768,108 C920,78 1035,146 1190,114 C1300,92 1375,110 1440,88 L1440,260 L0,260 Z" />
              <path fill="url(#surfaceMid)" opacity="0.85"
                d="M0,136 C140,100 248,172 408,130 C560,94 682,166 836,124 C1000,88 1118,158 1278,118 C1360,100 1408,118 1440,106 L1440,260 L0,260 Z" />
              <path fill="url(#surfaceFront)" opacity="0.97"
                d="M0,148 C118,112 255,188 400,144 C528,104 668,178 814,136 C978,90 1128,166 1285,130 C1362,112 1404,132 1440,120 L1440,260 L0,260 Z" />
              <rect x="-5%" y="108" width="110%" height="28" fill="url(#surfaceSpec)" opacity="0.72" />
            </g>
          </svg>
          <div className="surface-glare" />
          <div className="surface-glare-2" />
          <div className="surface-iridescent" />
          <div className="foam-line foam-line-one" />
          <div className="foam-line foam-line-two" />
          <div className="foam-line foam-line-three" />
        </div>
      </div>

      <div className="ocean-vignette" />
    </div>
  );
};

export default WaterSurface;