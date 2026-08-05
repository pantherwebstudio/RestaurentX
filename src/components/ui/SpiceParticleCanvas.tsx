'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SpiceParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ultra-Fine Pinpoint Fire Sparkle Radial Texture
    const createRealEmberTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 240, 1)');       // White-hot core
        gradient.addColorStop(0.2, 'rgba(255, 180, 40, 0.95)');    // Intense gold-orange
        gradient.addColorStop(0.5, 'rgba(235, 70, 10, 0.55)');     // Deep ember red
        gradient.addColorStop(1, 'rgba(180, 20, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const emberTexture = createRealEmberTexture();

    // Determine initial size: ultra tiny on mobile portrait (<640px)
    const isMobile = window.innerWidth < 640;
    const initialParticleSize = isMobile ? 0.38 : 0.6;

    // Fire Sparkle Particles (Rising & Flickering Embers)
    const particleCount = isMobile ? 180 : 260;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 60;
      positions[idx + 1] = (Math.random() - 0.5) * 45;
      positions[idx + 2] = (Math.random() - 0.5) * 30;

      velocities[idx] = (Math.random() - 0.5) * 0.025;
      velocities[idx + 1] = 0.025 + Math.random() * 0.035;
      velocities[idx + 2] = (Math.random() - 0.5) * 0.025;

      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Fiery Ember Shader Material with Additive Blending
    const material = new THREE.PointsMaterial({
      color: 0xffaa22,
      size: initialParticleSize,
      map: emberTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize & Dynamic Mobile Size Adjustments
    const onWindowResize = () => {
      const mobileNow = window.innerWidth < 640;
      material.size = mobileNow ? 0.38 : 0.6;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation Loop with Flickering Ember Effect
    let reqId: number;
    let clockTime = 0;

    const animate = () => {
      clockTime += 0.03;
      const posArr = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const xIdx = i * 3;
        const yIdx = i * 3 + 1;

        posArr[xIdx] += velocities[xIdx] + Math.sin(clockTime + phases[i]) * 0.012;
        posArr[yIdx] += velocities[yIdx];

        if (posArr[yIdx] > 25) {
          posArr[yIdx] = -25;
          posArr[xIdx] = (Math.random() - 0.5) * 60;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Realistic shimmer flicker
      material.opacity = 0.75 + Math.sin(clockTime * 4) * 0.15;

      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.04;

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      emberTexture.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-10 opacity-85"
    />
  );
}
