import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WaterSurface from "./components/WaterSurface";
import ScrollToTop from "./components/ScrollToTop";
import About from "./components/About"
import Achievements from "./components/Achievements";
import Writeups from "./components/Write-ups";

const App = () => {
  return (
    <main className="ocean-page">
      <WaterSurface />
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <Writeups />


      {/* Add your future sections/components below Hero.
          The ocean will automatically continue behind them. */}

      <ScrollToTop />
    </main>
  );
};

export default App;