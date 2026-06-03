import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const domains = [
  {
    num: "D1",
    name: "Security Principles",
    topics: ["CIA Triad", "Authentication", "Privacy", "Risk Mgmt"],
    accent: "#4fa3e3",
  },
  {
    num: "D2",
    name: "Business Continuity & IR",
    topics: ["BCP", "DR Plans", "Incident Response", "Recovery"],
    accent: "#00cc88",
  },
  {
    num: "D3",
    name: "Access Control Concepts",
    topics: ["MAC / DAC", "Role-Based AC", "Least Privilege", "IAM"],
    accent: "#ff9f43",
  },
  {
    num: "D4",
    name: "Network Security",
    topics: ["OSI / TCP-IP", "Firewalls", "IDS / IPS", "VPN"],
    accent: "#a29bfe",
  },
  {
    num: "D5",
    name: "Security Operations",
    topics: ["Physical Security", "Encryption", "Config Mgmt", "SIEM"],
    accent: "#fd79a8",
  },
];

const ISC2 = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(".isc2-tag, .isc2-title, .isc2-featured, .domain-card", {
        opacity: 0,
        y: 48,
      });

      gsap.to(".isc2-tag, .isc2-title", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.78,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.to(".isc2-featured", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.to(".domain-card", {
        opacity: 1,
        y: 0,
        stagger: 0.09,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="isc2" className="section-panel isc2-section" ref={sectionRef}>
      <div className="section-inner">

        <p className="section-tag isc2-tag">
          <span className="tag-dot" style={{ "--dot-color": "#4fa3e3" }} />
          CERTIFICATION:&nbsp;ISC2
        </p>

        <div className="isc2-header">
          <h2 className="section-title isc2-title">
            Certified in<br />
            <span className="title-outline" style={{ "--stroke": "#4fa3e3" }}>
              Cybersecurity
            </span>
          </h2>

          <div className="glass-card isc2-featured">
            <div className="isc2-cert-badge">CC</div>
            <div className="isc2-cert-info">
              <p className="isc2-cert-name">ISC2 &mdash; Certified in Cybersecurity</p>
              <p className="isc2-cert-sub">
                Summarised study notes covering all 5 official CC domains, curated
                from ISC2's official sources.
              </p>
              <a
                href="https://notalive.in/posts/CC/CC.html"
                target="_blank"
                rel="noopener noreferrer"
                className="isc2-notes-btn"
              >
                Read Full Study Notes &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="domains-grid">
          {domains.map((d, i) => (
            <div
              className="glass-card domain-card"
              key={i}
              style={{ "--accent": d.accent }}
            >
              <span className="domain-num">{d.num}</span>
              <h3 className="domain-name">{d.name}</h3>
              <ul className="domain-topics">
                {d.topics.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ISC2;