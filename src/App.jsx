import { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X, Sparkles, Orbit, Layers3, MousePointer2 } from 'lucide-react';
import { gsap } from 'gsap';
import InteractiveScene from './components/InteractiveScene.jsx';

const concepts = [
  { id: '01', name: 'ORBIT', category: 'Digital object / 3D', headline: 'Shape the unexpected.', copy: 'A living object built from light, movement and curiosity.', theme: 0 },
  { id: '02', name: 'FLUX', category: 'Interaction / UI', headline: 'Make it feel alive.', copy: 'An interface that responds, bends and breathes with every touch.', theme: 1 },
  { id: '03', name: 'NOVA', category: 'Experience / Web', headline: 'Beyond the screen.', copy: 'A small glimpse of the internet as an immersive space.', theme: 2 }
];

export default function App() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const hero = useRef(null);
  const touchStart = useRef(null);
  const concept = concepts[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.topbar', { y: -20, opacity: 0, duration: 0.7, ease: 'power2.out' });
      gsap.from('.hero-kicker, .hero-title, .hero-copy, .hero-actions, .hero-foot', { y: 25, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 });
      gsap.from('.hero-art', { opacity: 0, scale: 0.94, duration: 1.1, ease: 'power2.out', delay: 0.3 });
    }, hero);
    return () => ctx.revert();
  }, []);

  const move = (direction) => setActive((current) => (current + direction + concepts.length) % concepts.length);
  const scrollToProjects = () => document.getElementById('experiments')?.scrollIntoView({ behavior: 'smooth' });
  const handleTouchStart = (event) => { touchStart.current = event.touches[0].clientX; };
  const handleTouchEnd = (event) => {
    if (touchStart.current == null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return <main ref={hero}>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="WebForge home"><span className="brand-mark"><span /></span>WEB<span className="brand-light">FORGE</span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <a href="#experiments" onClick={() => setMenuOpen(false)}>Experiments</a>
        <a href="#studio" onClick={() => setMenuOpen(false)}>Studio</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <a className="top-cta" href="#contact">Let's talk <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-kicker"><span className="status-dot" /> DIGITAL PLAYGROUND — 2026</div>
        <h1 className="hero-title">Build beyond<br/><span>the ordinary.</span></h1>
        <p className="hero-copy">We turn ideas into immersive digital experiences. Less predictable. More playful. Impossible to ignore.</p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={scrollToProjects}>Explore the experience <ArrowUpRight size={17}/></button>
          <button className="round-btn" onClick={() => move(1)} aria-label="Next experience"><ArrowRight size={19}/></button>
        </div>
      </div>
      <div className="hero-art">
        <InteractiveScene theme={concept.theme}/>
        <div className="orbit-label label-top"><span>THREE.JS / REALTIME</span><span className="label-line"/></div>
        <div className="orbit-label label-side"><span>DRAG TO<br/>ROTATE</span></div>
        <div className="art-index">WF—{concept.id}</div>
      </div>
      <div className="hero-foot"><span>SCROLL TO DISCOVER <ArrowDown size={14}/></span><span>INTERACTIVE / 3D</span></div>
    </section>

    <section className="showcase" id="experiments">
      <div className="section-head"><div><div className="mini-kicker">SELECTED EXPERIMENTS</div><h2>Different by<br/>design.</h2></div><p>Move through ideas. Every interaction is an invitation to explore.</p></div>
      <div className="carousel-card" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className={`card-art card-theme-${concept.theme}`}><InteractiveScene theme={concept.theme}/><span className="card-watermark">{concept.name}</span></div>
        <div className="card-info"><div><span className="card-num">{concept.id} / 03</span><h3>{concept.name}</h3><p>{concept.category}</p><p className="card-description">{concept.copy}</p></div><div className="carousel-controls"><button onClick={() => move(-1)} aria-label="Previous concept"><ArrowLeft size={19}/></button><button onClick={() => move(1)} aria-label="Next concept"><ArrowRight size={19}/></button></div></div>
      </div>
      <div className="slide-dots">{concepts.map((item, i) => <button key={item.id} className={i === active ? 'dot active' : 'dot'} onClick={() => setActive(i)} aria-label={`Go to concept ${i+1}`} />)}</div>
    </section>

    <section className="manifesto" id="studio">
      <div className="mini-kicker">OUR PLAYGROUND</div><h2>Curiosity is our<br/><span>favorite tool.</span></h2>
      <div className="manifesto-bottom"><p>WebForge is a playground for ideas, where design meets technology and the web becomes something you can feel. We build with intention, experiment without fear and obsess over the tiny details that make an experience memorable.</p><div className="manifesto-icons"><div><Orbit/><span>Motion</span></div><div><Layers3/><span>Depth</span></div><div><MousePointer2/><span>Play</span></div></div></div>
    </section>

    <section className="contact" id="contact"><div className="mini-kicker">HAVE AN IDEA?</div><h2>Let's make<br/>something <span>matter.</span></h2><a className="contact-link" href="mailto:hello@webforge.studio">Start a conversation <ArrowUpRight/></a></section>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><span /></span>WEB<span className="brand-light">FORGE</span></a><span>© 2026 WEBFORGE EXPERIMENTS</span><span>MADE FOR THE CURIOUS <Sparkles size={13}/></span></footer>
  </main>;
}
