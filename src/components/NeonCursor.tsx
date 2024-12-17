import { useEffect, useState } from 'react';

export const NeonCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  // Hide on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-50 w-48 h-48 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'radial-gradient(circle, rgba(155,135,245,0.3) 0%, rgba(155,135,245,0.15) 30%, rgba(155,135,245,0.05) 60%, transparent 80%)',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        filter: 'blur(4px)',
        boxShadow: '0 0 40px rgba(155,135,245,0.2)',
      }}
    />
  );
};