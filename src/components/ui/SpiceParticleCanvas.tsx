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

    // Create High Resolution Delicate Gold Radial Particle Texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 225, 150, 1)');
        gradient.addColorStop(0.4, 'rgba(212, 175, 55, 0.8)');
        gradient.addColorStop(0.8, 'rgba(163, 121, 44, 0.3)');
        gradient.addColorStop(1, 'rgba(163, 121, 44, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const circleTexture = createCircleTexture();

    // Particle Geometry & Material (Tiny Delicate Gold Dust Specks)
    const particleCount = 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 65;
      positions[idx + 1] = (Math.random() - 0.5) * 45;
      positions[idx + 2] = (Math.random() - 0.5) * 35;
      speeds[i] = 0.015 + Math.random() * 0.025;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Shader Material with Tiny Size 0.6
    const material = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.6,
      map: circleTexture,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      alphaTest: 0.01,
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

    // Handle Resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let reqId: number;

    const animate = () => {
      const posArr = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const yIdx = i * 3 + 1;
        posArr[yIdx] += speeds[i];
        if (posArr[yIdx] > 25) {
          posArr[yIdx] = -25;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      particles.rotation.y += 0.0012;
      particles.rotation.x += 0.0006;

      camera.position.x += (mouseX * 2.0 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 2.0 - camera.position.y) * 0.04;

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
      circleTexture.dispose();
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
