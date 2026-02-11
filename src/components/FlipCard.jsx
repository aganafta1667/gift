import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/flipCard.css'

const FlipCard = ({ number, title, children }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      className="flip-card-container"
      onClick={handleClick}
    >
      <motion.div
        className="flip-card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {/* Front of card */}
        <div
          className="flip-card-front"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="flip-card-front-content">
            <div className="flip-card-number">0{number}</div>
            <h3 className="flip-card-title">{title}</h3>
            <div className="flip-card-hint">Click to read</div>
            <div className="flip-card-icon">💌</div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="flip-card-back"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="flip-card-back-content">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FlipCard
