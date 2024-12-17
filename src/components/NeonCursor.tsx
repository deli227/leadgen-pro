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
      className="fixed pointer-events-none z-50 w-32 h-32 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'radial-gradient(circle, rgba(155,135,245,0.35) 0%, rgba(155,135,245,0.15) 40%, transparent 70%)',
        filter: 'blur(15px)',
        boxShadow: '0 0 20px rgba(155,135,245,0.4)',
      }}
    />
  );
};