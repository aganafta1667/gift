import React from 'react';
import { useHeartCursor } from '../hooks/useHeartCursor';
import '../styles/HeartCursor.css';

const HeartCursor = () => {
  const hearts = useHeartCursor();

  return (
    <div className="heart-cursor-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.x,
            top: heart.y,
            '--angle': heart.angle,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default HeartCursor;
