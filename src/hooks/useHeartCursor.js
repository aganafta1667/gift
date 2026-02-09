import { useEffect, useRef, useState } from 'react';

export const useHeartCursor = () => {
  const [hearts, setHearts] = useState([]);
  const heartIdRef = useRef(0);
  const lastHeartTimeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      // Batasi pembuatan heart setiap 50ms untuk performance
      if (now - lastHeartTimeRef.current < 50) return;

      lastHeartTimeRef.current = now;

      const newHeart = {
        id: heartIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        angle: Math.random() * Math.PI * 2,
      };

      setHearts((prev) => {
        // Limit maksimal 30 hearts di layar
        const updated = [...prev, newHeart];
        return updated.length > 30 ? updated.slice(-30) : updated;
      });

      // Remove heart setelah animasi selesai (1.5 detik)
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return hearts;
};
