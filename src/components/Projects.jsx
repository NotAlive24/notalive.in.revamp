import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
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
    <section id="projects" className="section-panel" ref={sectionRef}>
      <div className="section-inner">

        <p className="section-tag the-tag">
          <span className="tag-dot" style={{ "--dot-color": "#4fa3e3" }} />
          Stuffs made by me
        </p>

        <h2 className="section-title the-title">
            Projects
        </h2>
        
        <div>
             <ul className="writeups-grid">
                {projects.map((link) => (
                    <a href={link.href}>
                        <div key={link.href} className="glass-card glass-card-accent glass-card-hover">
                            <a href={link.href}>{link.title} target="_blank" rel="noopener noreferrer"</a>
                        </div>
                    </a>
                ))}
            </ul>
        </div>
      </div>
    </section>
  );
};

export default Projects;