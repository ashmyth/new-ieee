import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-canvas-light text-text-primary selection:bg-brand-blue selection:text-text-inverted">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content with Pinned Hero and Curtain Slide-Over About Section */}
      <main className="w-full relative">
        {/* Pinned Hero Layer (Hero text & grid remain completely still while scrolling) */}
        <div 
          id="hero-pinned-layer" 
          className="sticky top-0 w-full h-screen z-10 overflow-hidden bg-canvas-light"
        >
          <Hero />
        </div>

        {/* Slide-Over About Layer (Clean flat black edge without top shadow) */}
        <div 
          id="about-slide-layer" 
          className="relative z-20 w-full bg-canvas-dark"
        >
          <About />
        </div>
      </main>
    </div>
  );
}
