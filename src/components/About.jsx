import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
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
    <section id="about" className="section-panel" ref={sectionRef}>
      <div className="section-inner">

        <p className="section-tag the-tag">
          <span className="tag-dot" style={{ "--dot-color": "#4fa3e3" }} />
          Welcome
        </p>

        <h2 className="section-title the-title">
          ABOUT<br />
          <span className="title-outline" style={{ "--stroke": "#4fa3e3" }}>
            ME
          </span>
        </h2>

        <div className="glass-card glass-card-accent glass-card-hover">
          Hey there 👋, computer science undergraduate operating under the handle Not Alive. <br />
          My real name is Sanjay. <br />
          And I use Arch btw <br />
          I am an Undergraduate student currently in my First year of Computer Science and Engineering. <br />
          I was Born in 2007. <br />
          I love Cybersecurity and Michael, especially offensive security, CTFs, and network security.
        </div>
      </div>
    </section>
  );
};

export default About;