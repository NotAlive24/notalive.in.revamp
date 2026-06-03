import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useGSAP(() => {
    gsap.fromTo(
      "nav",
      {
        backgroundColor: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(0px)",
        borderColor: "rgba(255, 255, 255, 0)",
      },
      {
        backgroundColor: "rgba(1, 15, 28, 0.58)",
        backdropFilter: "blur(18px)",
        borderColor: "rgba(178, 235, 255, 0.12)",
        duration: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ocean-page",
          start: "90 top",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <nav>
      <div className="nav-inner">
        <a href="#home" className="brand">
          <img src="/logo.png" alt="Not Alive logo" />
          <p>Not Alive</p>
        </a>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;