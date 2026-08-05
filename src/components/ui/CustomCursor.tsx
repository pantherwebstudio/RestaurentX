'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPosition, setFollowerPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    // Higher LERP factor (0.45) for ultra-fast, snappy follower tracking
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      setFollowerPosition((prev) => ({
        x: lerp(prev.x, posRef.current.x, 0.45),
        y: lerp(prev.y, posRef.current.y, 0.45),
      }));
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2.5 w-2.5 rounded-full bg-[#C6A15B] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${isClicking ? 0.6 : isHovered ? 1.6 : 1})`,
          boxShadow: '0 0 10px rgba(198, 161, 91, 0.8)',
        }}
      />

      {/* Outer Follower Ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-[#C6A15B]/70 transition-all duration-150 ease-out"
        style={{
          width: isHovered ? '46px' : '26px',
          height: isHovered ? '46px' : '26px',
          transform: `translate3d(${followerPosition.x - (isHovered ? 23 : 13)}px, ${followerPosition.y - (isHovered ? 23 : 13)}px, 0)`,
          backgroundColor: isHovered ? 'rgba(198, 161, 91, 0.15)' : 'transparent',
          boxShadow: isHovered ? '0 0 25px rgba(198, 161, 91, 0.4)' : 'none',
        }}
      />
    </>
  );
}
