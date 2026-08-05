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

    // Create Circular Radial Texture for smooth round particles
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(229, 195, 131, 0.8)');
        gradient.addColorStop(1, 'rgba(198, 161, 91, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const circleTexture = createCircleTexture();

    // Particle Geometry & Material
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 30;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Gold Circular Shader Material
    const material = new THREE.PointsMaterial({
      color: 0xc6a15b,
      size: 0.75,
      map: circleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
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

    window.addEventListener('mousemove', onMouseMove);

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
      const elapsedTime = performance.now() * 0.001;

      // Slow rotation
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = elapsedTime * 0.02;

      // Gentle camera sway
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.03;

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
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}
