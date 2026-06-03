import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contact } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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
    <section id="contact" className="section-panel" ref={sectionRef}>
      <div className="section-inner">

        <p className="section-tag the-tag">
          <span className="tag-dot" style={{ "--dot-color": "#4fa3e3" }} />
          To get in touch
        </p>

        <h2 className="section-title the-title">
          Contact<br />
        </h2>

        <div>
            <ul className="writeups-grid">
                {contact.map((link) => (
                    <a href={link.href}>
                        <div key={link.href} className="glass-card glass-card-accent glass-card-hover" target="_blank" rel="noopener noreferrer">
                            <a href={link.href} className={link.class}  target="_blank" rel="noopener noreferrer">
                                <img src={link.logo} alt="logo" />
                                <p>{link.title}</p>
                            </a>
                        </div>
                    </a>            
                ))}
            </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;