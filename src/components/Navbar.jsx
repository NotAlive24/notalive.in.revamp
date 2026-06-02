import { useGSAP } from "@gsap/react"
import { navLinks } from "../../constants"

const Navbar = () => {
  useGSAP(()=>{
    const navTween = gsap.timeline({
      scrollTrigger: {
        Trigger: 'nav',
        start: 'bottom top'
      }
    })
    navTween.fromTo('nav', {
      backgroundColor: 'transparent',
    },
    {
      backgroundColor: '#00000030',
      backgroundFilter: 'blur(10px)',
      duration: 1,
      ease: 'power1.inOut'
    });
  })
  return (
    <nav>
      <div>
        <a href="#home" className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="rounded-[15%] w-12 h-12 md:w-14 md:h-14 object-contain" />
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
  )
}
export default Navbar