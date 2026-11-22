import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InteractiveScene({ theme = 0 }) {
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 8.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);

    const colors = [0x8d80ff, 0x71dfff, 0xff9d67];
    const group = new THREE.Group();
    scene.add(group);
    const coreGeo = new THREE.IcosahedronGeometry(1.18, 5);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: colors[theme % 3], metalness: 0.48, roughness: 0.2,
      clearcoat: 1, clearcoatRoughness: 0.14, transmission: 0.12,
      thickness: 1.1, emissive: colors[theme % 3], emissiveIntensity: 0.22
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const ringMat = new THREE.MeshStandardMaterial({ color: 0xd4e8ff, metalness: 0.85, roughness: 0.24 });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.012, 8, 240), ringMat);
    ringA.rotation.set(1.12, 0.3, 0.1);
    group.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.009, 8, 240), new THREE.MeshStandardMaterial({ color: colors[theme % 3], metalness: 0.7, roughness: 0.3 }));
    ringB.rotation.set(-0.48, 0.8, 0.7);
    group.add(ringB);

    const starGeo = new THREE.BufferGeometry();
    const count = 850;
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      points[i * 3] = (Math.random() - 0.5) * 13;
      points[i * 3 + 1] = (Math.random() - 0.5) * 9;
      points[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(points, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xa5b7d9, size: 0.012, transparent: true, opacity: 0.65 }));
    scene.add(stars);

    scene.add(new THREE.AmbientLight(0xffffff, 1.3));
    const key = new THREE.PointLight(0xffffff, 35, 18); key.position.set(4, 3, 5); scene.add(key);
    const fill = new THREE.PointLight(colors[theme % 3], 30, 16); fill.position.set(-4, -2, 3); scene.add(fill);

    let pointerDown = false, prevX = 0, prevY = 0, targetX = 0, targetY = 0;
    const down = (e) => { pointerDown = true; prevX = e.clientX; prevY = e.clientY; renderer.domElement.setPointerCapture?.(e.pointerId); };
    const up = () => { pointerDown = false; };
    const move = (e) => {
      if (!pointerDown) return;
      targetY += (e.clientX - prevX) * 0.008;
      targetX += (e.clientY - prevY) * 0.008;
      prevX = e.clientX; prevY = e.clientY;
    };
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    renderer.domElement.addEventListener('pointerdown', down);
    renderer.domElement.addEventListener('pointerup', up);
    renderer.domElement.addEventListener('pointercancel', up);
    renderer.domElement.addEventListener('pointermove', move);
    window.addEventListener('resize', onResize);
    const clock = new THREE.Clock();
    let frame;
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y += (targetY - group.rotation.y) * 0.06;
      group.rotation.x += (targetX - group.rotation.x) * 0.06;
      if (!pointerDown) group.rotation.y += 0.0023;
      ringA.rotation.z += 0.001;
      ringB.rotation.x += 0.0007;
      stars.rotation.y = t * 0.018;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', down);
      renderer.domElement.removeEventListener('pointerup', up);
      renderer.domElement.removeEventListener('pointercancel', up);
      renderer.domElement.removeEventListener('pointermove', move);
      coreGeo.dispose(); coreMat.dispose(); ringA.geometry.dispose(); ringB.geometry.dispose();
      ringMat.dispose(); ringB.material.dispose(); starGeo.dispose(); stars.material.dispose();
      renderer.dispose(); renderer.domElement.remove();
    };
  }, [theme]);
  return <div ref={host} className="three-host" aria-label="Interactive 3D object. Drag to rotate." />;
}
