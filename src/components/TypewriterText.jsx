import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const TypewriterText = ({ text, delay = 0, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const memoizedOnComplete = useCallback(() => {
    if (onComplete) {
      onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    if (!text) return

    let currentIndex = 0
    const timeoutId = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsComplete(true)
          memoizedOnComplete()
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [text, delay, speed, memoizedOnComplete])

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="text-pink-200 text-justify mb-8 text-sm md:text-lg"
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="inline-block w-2 h-5 ml-1 bg-pink-400"
        />
      )}
    </motion.p>
  )
}

export default TypewriterText
