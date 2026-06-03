import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.set(".the-tag, .the-title, .the-card", { opacity: 0, y: 48 });

    gsap.to(".the-tag, .the-title", {
      opacity: 1, y: 0,
      stagger: 0.1, duration: 0.78, ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
        once: true,
      },
    });

    gsap.to(".the-card", {
      opacity: 1, y: 0,
      stagger: 0.09, duration: 0.75, ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 55%",
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="achievements" className="section-panel" ref={sectionRef}>
      <div className="section-inner">

        <p className="section-tag the-tag">
          <span className="tag-dot" style={{ "--dot-color": "#4fa3e3" }} />
          What's special about me?
        </p>

        <h2 className="section-title the-title">
          Achievements<br />
        </h2>

        <div className="glass-card glass-card-accent glass-card-hover">
            
            <span className="coloured-dihh">
                Global Top 2% Hacker (TryHackMe):
            </span> <br /> 
            <span className="dihh-sized-gap">
                Racked up 19,000+ points, a capability score of 59, and 30+ shiny badges across 195+ rooms. (Yes, I own the mandatory black hoodie, but, I won't hack your ex's Wi-Fi). 
            </span>
            <br />

            <span className="coloured-dihh">
                CTF Veteran:
            </span> <br />
            <span className="dihh-sized-gap">
                Snagged 286th place globally in the Industrial Intrusion CTF, and battled through events like Advent of Cyber 2025 and Love at First Breach (because I couldn't spend Valentine with anyone, heck I just googled the spelling of Valentine.). 
            </span>
            <br />

            <span className="coloured-dihh">
                Certified Digital Burglar (and Fixer): 
            </span>
            <span className="dihh-sized-gap">
                Conquered the Web Fundamentals, Jr. Penetration Tester, and Web App Pentesting paths. I know how to track down vulnerabilities, launch the exploits, and most importantly tell you exactly how to patch them up! (Probably).
            </span>
        </div>
      </div>
    </section>
  );
};

export default Achievements;