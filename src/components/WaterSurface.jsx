import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const createMarineSnow = (count) =>
  Array.from({ length: count }, (_, index) => ({
    left: `${(index * 31) % 100}%`,
    top: `${(index * 47) % 100}%`,
    size: `${1 + (index % 4) * 0.65}px`,
    opacity: 0.1 + (index % 5) * 0.035,
  }));

const createBubbles = (count) =>
  Array.from({ length: count }, (_, index) => ({
    left: `${(index * 23) % 100}%`,
    size: `${4 + (index % 5) * 3}px`,
  }));

const createFish = () => [
  {
    className: "fish-one",
    top: "35%",
    scale: 0.5,
    duration: 34,
    delay: -2,
    direction: 1,
    opacity: 0.48,
  },
  {
    className: "fish-two",
    top: "48%",
    scale: 0.34,
    duration: 42,
    delay: -13,
    direction: -1,
    opacity: 0.34,
  },
  {
    className: "fish-three",
    top: "61%",
    scale: 0.42,
    duration: 38,
    delay: -21,
    direction: 1,
    opacity: 0.42,
  },
  {
    className: "fish-four",
    top: "72%",
    scale: 0.28,
    duration: 48,
    delay: -6,
    direction: -1,
    opacity: 0.28,
  },
  {
    className: "fish-five",
    top: "42%",
    scale: 0.25,
    duration: 54,
    delay: -31,
    direction: 1,
    opacity: 0.26,
  },
  {
    className: "fish-six",
    top: "57%",
    scale: 0.32,
    duration: 46,
    delay: -18,
    direction: -1,
    opacity: 0.32,
  },
];

const WaterSurface = () => {
  const sceneRef = useRef(null);

  const marineSnow = useMemo(() => createMarineSnow(110), []);
  const bubbles = useMemo(() => createBubbles(26), []);
  const fish = useMemo(() => createFish(), []);

  useGSAP(
    () => {
      const scene = sceneRef.current;
      const page = document.querySelector(".ocean-page");
      const hero = document.querySelector(".hero-inner");

      if (!scene || !page) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.set(page, {
        "--water-height": "10svh",
        "--sky-opacity": 1,
        "--surface-opacity": 1,
        "--surface-y": "0px",
        "--surface-scale": 1,
        "--underwater-strength": 0,
        "--deep-strength": 0,
        "--ray-strength": 0,
        "--fish-strength": 0,
        "--caustics-strength": 0.18,
      });

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
        .to(
          page,
          {
            "--water-height": "100svh",
            "--sky-opacity": 0,
            "--surface-opacity": 0.42,
            "--surface-y": "-120px",
            "--surface-scale": 0.76,
            "--underwater-strength": 1,
            "--ray-strength": 0.58,
            "--fish-strength": 1,
            "--caustics-strength": 0.42,
            ease: "none",
          },
          0
        )
        .to(
          ".surface-wrap",
          {
            filter: "blur(1.15px)",
            ease: "none",
          },
          0.25
        );

      if (hero) {
        introDive.to(
          hero,
          {
            y: -150,
            opacity: 0.14,
            scale: 0.9,
            filter: "blur(1.1px)",
            ease: "none",
          },
          0.08
        );
      }

      const depthTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: page,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      });

      depthTimeline.to(page, {
        "--deep-strength": 1,
        ease: "none",
      });

      if (!reduceMotion) {
        gsap.to(".surface-svg", {
          y: 16,
          scaleY: 1.05,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("#waterNoise", {
          attr: {
            baseFrequency: "0.013 0.047",
          },
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("#waterDisplacement", {
          attr: {
            scale: 22,
          },
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".surface-glare", {
          xPercent: 30,
          duration: 7.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".foam-line-one", {
          xPercent: -35,
          duration: 9,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".foam-line-two", {
          xPercent: 28,
          duration: 12,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".foam-line-three", {
          xPercent: -21,
          duration: 15,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".caustics-a", {
          backgroundPosition: "920px 660px",
          duration: 24,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".caustics-b", {
          backgroundPosition: "-760px 520px",
          duration: 31,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".light-ray", {
          yPercent: -16,
          opacity: 0.22,
          duration: 6,
          repeat: -1,
          yoyo: true,
          stagger: 0.8,
          ease: "sine.inOut",
        });

        gsap.utils.toArray(".bubble", scene).forEach((bubble, index) => {
          gsap.fromTo(
            bubble,
            {
              y: gsap.utils.random(160, 760),
              x: gsap.utils.random(-18, 18),
              opacity: 0,
              scale: gsap.utils.random(0.5, 1.1),
            },
            {
              y: gsap.utils.random(-850, -260),
              x: gsap.utils.random(-70, 70),
              opacity: gsap.utils.random(0.16, 0.46),
              duration: gsap.utils.random(10, 21),
              delay: index * 0.28,
              repeat: -1,
              ease: "sine.inOut",
            }
          );
        });

        gsap.utils
          .toArray(".marine-particle", scene)
          .forEach((particle) => {
            gsap.to(particle, {
              x: gsap.utils.random(-38, 38),
              y: gsap.utils.random(-48, 48),
              opacity: gsap.utils.random(0.08, 0.32),
              duration: gsap.utils.random(5, 11),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          });

        gsap.utils.toArray(".fish-unit", scene).forEach((fishEl) => {
          const direction = Number(fishEl.dataset.direction);
          const duration = Number(fishEl.dataset.duration);
          const delay = Number(fishEl.dataset.delay);

          gsap.fromTo(
            fishEl,
            {
              x: direction === 1 ? "-18vw" : "118vw",
            },
            {
              x: direction === 1 ? "118vw" : "-18vw",
              duration,
              delay,
              repeat: -1,
              ease: "none",
            }
          );

          gsap.to(fishEl.querySelector(".fish-bob"), {
            y: gsap.utils.random(-10, 10),
            rotation: gsap.utils.random(-2.2, 2.2),
            duration: gsap.utils.random(2.8, 5.4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(fishEl.querySelector(".fish-tail"), {
            transformOrigin: "67px 18px",
            rotate: direction === 1 ? 8 : -8,
            duration: gsap.utils.random(0.34, 0.52),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      let refreshTween;

      const refresh = () => {
        if (refreshTween) refreshTween.kill();

        refreshTween = gsap.delayedCall(0.15, () => {
          ScrollTrigger.refresh();
        });
      };

      const resizeObserver = new ResizeObserver(refresh);
      resizeObserver.observe(document.body);
      resizeObserver.observe(page);

      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      return () => {
        if (refreshTween) refreshTween.kill();

        resizeObserver.disconnect();
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
      };
    },
    { scope: sceneRef }
  );

  return (
    <div ref={sceneRef} className="ocean-scene" aria-hidden="true">
      <div className="sky-layer">
        <div className="sun" />
        <div className="horizon-haze" />
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
      </div>

      <div className="water-layer">
        <div className="water-volume">
          <div className="underwater-gradient" />
          <div className="underwater-haze" />

          <div className="light-rays">
            <span className="light-ray ray-a" />
            <span className="light-ray ray-b" />
            <span className="light-ray ray-c" />
            <span className="light-ray ray-d" />
          </div>

          <div className="caustics caustics-a" />
          <div className="caustics caustics-b" />

          <div className="marine-snow">
            {marineSnow.map((particle, index) => (
              <span
                key={`marine-particle-${index}`}
                className="marine-particle"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                }}
              />
            ))}
          </div>

          <div className="bubble-field">
            {bubbles.map((bubble, index) => (
              <span
                key={`bubble-${index}`}
                className="bubble"
                style={{
                  left: bubble.left,
                  width: bubble.size,
                  height: bubble.size,
                }}
              />
            ))}
          </div>

          <div className="fish-field">
            {fish.map((fishItem, index) => (
              <div
                key={`fish-${index}`}
                className={`fish-unit ${fishItem.className}`}
                data-direction={fishItem.direction}
                data-duration={fishItem.duration}
                data-delay={fishItem.delay}
                style={{
                  top: fishItem.top,
                  opacity: fishItem.opacity,
                  "--fish-scale": fishItem.scale,
                  "--fish-flip": fishItem.direction === 1 ? -1 : 1,
                }}
              >
                <div className="fish-scale">
                  <div className="fish-bob">
                    <svg
                      className="fish-swim"
                      viewBox="0 0 88 36"
                      aria-hidden="true"
                    >
                      <path
                        className="fish-tail"
                        d="M65 18 C77 7 84 6 87 8 C82 14 82 22 87 28 C82 31 76 29 65 18 Z"
                      />
                      <path
                        className="fish-body"
                        d="M6 18 C18 5 45 2 67 18 C45 34 18 31 6 18 Z"
                      />
                      <path
                        className="fish-belly"
                        d="M17 20 C31 27 49 27 62 18 C48 30 28 31 17 20 Z"
                      />
                      <path
                        className="fish-fin"
                        d="M37 19 C31 22 28 27 29 31 C36 29 42 25 45 20 Z"
                      />
                      <circle className="fish-eye" cx="18" cy="15" r="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-wrap">
          <svg
            className="surface-svg"
            viewBox="0 0 1440 260"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="surfaceBack" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4ffff" stopOpacity="0.34" />
                <stop offset="45%" stopColor="#74e6ff" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#0088b8" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="surfaceMid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e9ffff" stopOpacity="0.72" />
                <stop offset="40%" stopColor="#57dcff" stopOpacity="0.52" />
                <stop offset="100%" stopColor="#0083b5" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="surfaceFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
                <stop offset="26%" stopColor="#9af5ff" stopOpacity="0.78" />
                <stop offset="58%" stopColor="#14b7ef" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0078ad" stopOpacity="0" />
              </linearGradient>

              <filter
                id="waterDistortion"
                x="-10%"
                y="-40%"
                width="120%"
                height="180%"
              >
                <feTurbulence
                  id="waterNoise"
                  type="fractalNoise"
                  baseFrequency="0.009 0.036"
                  numOctaves="3"
                  seed="11"
                  result="noise"
                />
                <feDisplacementMap
                  id="waterDisplacement"
                  in="SourceGraphic"
                  in2="noise"
                  scale="14"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feGaussianBlur stdDeviation="0.28" />
              </filter>
            </defs>

            <g filter="url(#waterDistortion)">
              <path
                className="surface-path surface-back"
                d="M0,122 C130,100 240,148 370,124 C520,96 645,138 790,112 C940,86 1040,144 1190,116 C1305,96 1375,110 1440,92 L1440,260 L0,260 Z"
              />
              <path
                className="surface-path surface-mid"
                d="M0,140 C160,104 255,170 420,132 C575,99 695,164 850,126 C1010,91 1125,154 1285,120 C1365,104 1415,116 1440,108 L1440,260 L0,260 Z"
              />
              <path
                className="surface-path surface-front"
                d="M0,152 C120,116 260,184 405,142 C535,104 675,174 820,134 C980,90 1130,162 1288,128 C1360,112 1400,130 1440,118 L1440,260 L0,260 Z"
              />
            </g>
          </svg>

          <div className="surface-glare" />
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