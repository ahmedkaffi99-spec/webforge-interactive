export default function App() {
  const styles = {
    page: { minHeight: '100vh', background: '#070b14', color: '#f5f7fb', fontFamily: 'system-ui, sans-serif', overflow: 'hidden' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px clamp(20px, 7vw, 80px)', borderBottom: '1px solid rgba(255,255,255,.08)' },
    brand: { fontWeight: 800, letterSpacing: '.14em', fontSize: 14 },
    nav: { display: 'flex', gap: 22, color: '#aab4c8', fontSize: 13 },
    hero: { padding: '70px clamp(20px, 7vw, 80px) 35px', minHeight: '78vh', position: 'relative', display: 'flex', alignItems: 'center' },
    title: { fontSize: 'clamp(48px, 11vw, 100px)', lineHeight: .98, letterSpacing: '-.07em', margin: '24px 0', position: 'relative', zIndex: 2 },
    copy: { maxWidth: 390, color: '#aab4c6', fontSize: 15, lineHeight: 1.8, position: 'relative', zIndex: 2 },
    art: { position: 'absolute', width: 'min(78vw, 580px)', height: 'min(78vw, 580px)', right: '2%', top: '50%', transform: 'translateY(-50%)', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #fff 0%, #9b8cff 8%, #493a96 30%, rgba(7,11,20,0) 68%)', opacity: .85, pointerEvents: 'none' },
    btn: { marginTop: 26, display: 'inline-block', background: '#d7f5ff', color: '#07101b', borderRadius: 30, padding: '14px 20px', fontWeight: 700, textDecoration: 'none', fontSize: 13 },
    section: { padding: '65px clamp(20px, 7vw, 80px)', background: '#0b101c' },
    sectionTitle: { fontSize: 'clamp(36px, 7vw, 64px)', lineHeight: 1.05, letterSpacing: '-.06em', margin: '20px 0' },
    card: { border: '1px solid rgba(255,255,255,.12)', borderRadius: 16, padding: 28, background: '#101827', marginTop: 30 },
    kicker: { color: '#aab4c6', fontSize: 11, letterSpacing: '.16em', fontFamily: 'monospace' }
  };
  return <div style={styles.page}>
    <header style={styles.header}><div style={styles.brand}>◈ WEBFORGE</div><nav style={styles.nav}><a style={{color:'inherit',textDecoration:'none'}} href="#experiments">Experiments</a><a style={{color:'inherit',textDecoration:'none'}} href="#studio">Studio</a><a style={{color:'inherit',textDecoration:'none'}} href="#contact">Contact</a></nav></header>
    <section style={styles.hero}><div style={styles.art}/><div style={{maxWidth:640,position:'relative'}}><div style={styles.kicker}>DIGITAL PLAYGROUND — 2026</div><h1 style={styles.title}>Build beyond<br/><span style={{color:'#9be7ff'}}>the ordinary.</span></h1><p style={styles.copy}>We turn ideas into immersive digital experiences. Less predictable. More playful. Impossible to ignore.</p><a href="#experiments" style={styles.btn}>Explore the experience ↗</a></div></section>
    <section id="experiments" style={styles.section}><div style={styles.kicker}>SELECTED EXPERIMENTS</div><h2 style={styles.sectionTitle}>Different by<br/>design.</h2><p style={styles.copy}>Move through ideas. Every interaction is an invitation to explore.</p><div style={styles.card}><div style={styles.kicker}>01 / 03 — ORBIT</div><h2 style={{fontSize:30,margin:'14px 0'}}>A digital object made of light.</h2><p style={styles.copy}>A living object built from light, movement and curiosity.</p></div><div style={styles.card}><div style={styles.kicker}>02 / 03 — FLUX</div><h2 style={{fontSize:30,margin:'14px 0'}}>Interfaces that breathe.</h2><p style={styles.copy}>An interface that responds, bends and breathes with every touch.</p></div><div style={styles.card}><div style={styles.kicker}>03 / 03 — NOVA</div><h2 style={{fontSize:30,margin:'14px 0'}}>A web of possibility.</h2><p style={styles.copy}>A glimpse of the internet as an immersive space.</p></div></section>
    <section id="studio" style={{...styles.section,background:'#070b14'}}><div style={styles.kicker}>OUR PLAYGROUND</div><h2 style={styles.sectionTitle}>Curiosity is our<br/><span style={{color:'#9be7ff'}}>favorite tool.</span></h2><p style={{...styles.copy,maxWidth:560}}>WebForge is a playground for ideas, where design meets technology and the web becomes something you can feel. We build with intention, experiment without fear and obsess over the tiny details that make an experience memorable.</p></section>
    <section id="contact" style={{...styles.section,background:'#d7f5ff',color:'#07101b'}}><div style={{...styles.kicker,color:'#4e6275'}}>HAVE AN IDEA?</div><h2 style={styles.sectionTitle}>Let's make<br/>something matter.</h2><a style={{...styles.btn,background:'#07101b',color:'#d7f5ff'}} href="mailto:hello@webforge.studio">Start a conversation ↗</a></section>
    <footer style={{padding:'28px clamp(20px, 7vw, 80px)',display:'flex',justifyContent:'space-between',gap:15,flexWrap:'wrap',fontSize:10,letterSpacing:'.1em',color:'#7e899c'}}><strong style={{color:'#f5f7fb'}}>WEBFORGE</strong><span>© 2026 WEBFORGE EXPERIMENTS</span></footer>
  </div>;
}
