import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/flipCard.css'

const GalleryFlipCard = ({ image, caption }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <motion.div
      className="gallery-flip-card-container"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
    >
      <motion.div
        className="gallery-flip-card-inner"
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
        {/* Front - Image */}
        <div
          className="gallery-flip-card-front"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="gallery-flip-card-image"
            loading="lazy"
          />
          <div className="gallery-flip-card-overlay">
            <span className="gallery-flip-hint">Click to flip</span>
          </div>
        </div>

        {/* Back - Caption */}
        <div
          className="gallery-flip-card-back"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="gallery-flip-card-back-content">
            <p className="gallery-flip-caption">{caption || image.alt}</p>
            <div className="gallery-flip-icon">💕</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GalleryFlipCard
