import { useRef, useState } from 'react';

export default function InteractiveScene({ theme = 0 }) {
  const [rotation, setRotation] = useState({ x: -12, y: 0 });
  const pointer = useRef(null);
  const colors = ['#9b8cff', '#75dcff', '#ffac76'];
  const color = colors[theme % 3];
  const start = (e) => { pointer.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture?.(e.pointerId); };
  const drag = (e) => {
    if (!pointer.current) return;
    const dx = e.clientX - pointer.current.x, dy = e.clientY - pointer.current.y;
    pointer.current = { x: e.clientX, y: e.clientY };
    setRotation(r => ({ x: r.x + dy * .45, y: r.y + dx * .45 }));
  };
  const end = () => { pointer.current = null; };
  return <div className="three-host css-scene" onPointerDown={start} onPointerMove={drag} onPointerUp={end} onPointerCancel={end} aria-label="Interactive 3D-inspired object. Drag to rotate.">
    <div className="scene-stars" />
    <div className="css-orbit orbit-one" style={{ transform: `translate(-50%,-50%) rotateX(65deg) rotateZ(${rotation.y}deg)`, borderColor: color }} />
    <div className="css-orbit orbit-two" style={{ transform: `translate(-50%,-50%) rotateY(66deg) rotateZ(${rotation.x}deg)`, borderColor: color }} />
    <div className="css-orbit orbit-three" style={{ transform: `translate(-50%,-50%) rotateX(22deg) rotateZ(${rotation.y * .6}deg)` }} />
    <div className="css-core" style={{ background: `radial-gradient(circle at 30% 25%, #ffffff 0%, ${color} 20%, #21184b 62%, #090d18 100%)`, transform: `translate(-50%,-50%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}><div className="core-glint" /></div>
    <div className="scene-glow" style={{ background: color }} />
  </div>;
}
