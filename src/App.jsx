import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X, Sparkles, Layers3, Orbit, MousePointer2 } from 'lucide-react';
import { gsap } from 'gsap';

const slides = [
  { number: '01', title: 'Shape the\nunexpected.', name: 'ORBIT', tag: 'Motion / 3D', color: 'violet' },
  { number: '02', title: 'Make it\nfeel alive.', name: 'FLUX', tag: 'Interaction / UI', color: 'cyan' },
  { number: '03', title: 'Beyond the\nscreen.', name: 'NOVA', tag: 'Digital / Experience', color: 'orange' },
];

function Orb({ color = 'violet' }) {
  return <div className={`orb orb-${color}`} aria-hidden="true">
    <div className="orb-core" /><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><div className="orb-ring ring-three" />
    <div className="orb-glint" />
  </div>;
}

export default function App() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const slide = slides[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title, .hero-copy, .hero-actions, .hero-foot', {
        y: 28, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out'
      });
      gsap.from('.orb', { scale: 0.78, opacity: 0, duration: 1.3, ease: 'power3.out', delay: 0.2 });
      gsap.from('.topbar', { y: -18, opacity: 0, duration: 0.8, ease: 'power2.out' });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const changeSlide = (dir) => setActive((current) => (current + dir + slides.length) % slides.length);
  const scrollToShowcase = () => document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' });

  return <main ref={heroRef}>
    <header className="topbar">
      <a className="brand" href="#" aria-label="WebForge home"><span className="brand-mark"><span /></span>WEB<span className="brand-light">FORGE</span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <a href="#showcase" onClick={() => setMenuOpen(false)}>Experiments</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>Studio</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <a className="top-cta" href="#contact">Let's talk <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <section className="hero" id="showcase">
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-kicker"><span className="status-dot" /> DIGITAL PLAYGROUND — 2026</div>
        <h1 className="hero-title">Build beyond<br/><span>the ordinary.</span></h1>
        <p className="hero-copy">We turn ideas into immersive digital experiences. Less predictable. More playful. Impossible to ignore.</p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={scrollToShowcase}>Explore the experience <ArrowUpRight size={17}/></button>
          <button className="round-btn" onClick={() => changeSlide(1)} aria-label="Next concept"><ArrowRight size={19}/></button>
        </div>
      </div>
      <div className="hero-art" aria-label="Interactive 3D-inspired orbital artwork">
        <Orb color={slide.color} />
        <div className="orbit-label label-top"><span>WEBGL / READY</span><span className="label-line"/></div>
        <div className="orbit-label label-side"><span>INTERACTIVE<br/>ARTIFACT</span></div>
        <div className="art-index">WF—{slide.number}</div>
      </div>
      <div className="hero-foot"><span>SCROLL TO DISCOVER <ArrowDown size={14}/></span><span>01 / 03</span></div>
    </section>

    <section className="showcase">
      <div className="section-head">
        <div><div className="mini-kicker">SELECTED EXPERIMENTS</div><h2>Different by<br/>design.</h2></div>
        <p>Move through ideas. Every interaction is a little invitation to explore.</p>
      </div>
      <div className="carousel-card">
        <div className={`card-art card-${slide.color}`}><Orb color={slide.color}/><span className="card-watermark">{slide.name}</span></div>
        <div className="card-info"><div><span className="card-num">{slide.number} / 03</span><h3>{slide.name}</h3><p>{slide.tag}</p></div><div className="carousel-controls"><button onClick={() => changeSlide(-1)} aria-label="Previous"><ArrowLeft size={19}/></button><button onClick={() => changeSlide(1)} aria-label="Next"><ArrowRight size={19}/></button></div></div>
      </div>
      <div className="slide-dots">{slides.map((s, i) => <button key={s.number} className={i === active ? 'dot active' : 'dot'} onClick={() => setActive(i)} aria-label={`Go to slide ${i+1}`} />)}</div>
    </section>

    <section className="manifesto" id="about">
      <div className="mini-kicker">OUR PLAYGROUND</div><h2>Curiosity is our<br/><span>favorite tool.</span></h2>
      <div className="manifesto-bottom"><p>WebForge is a playground for ideas, where design meets technology and the web becomes something you can feel.</p><div className="manifesto-icons"><div><Orbit/><span>Motion</span></div><div><Layers3/><span>Depth</span></div><div><MousePointer2/><span>Play</span></div></div></div>
    </section>

    <section className="contact" id="contact"><div className="mini-kicker">HAVE AN IDEA?</div><h2>Let's make<br/>something <span>matter.</span></h2><a className="contact-link" href="mailto:hello@webforge.studio">Start a conversation <ArrowUpRight/></a></section>
    <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><span /></span>WEB<span className="brand-light">FORGE</span></a><span>© 2026 WEBFORGE EXPERIMENTS</span><span>MADE FOR THE CURIOUS <Sparkles size={13}/></span></footer>
  </main>;
}