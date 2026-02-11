import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import '../styles/start.css'
import '../styles/pesan.css'
import TypewriterText from './TypewriterText'

const Pesan = () => {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0)
  const [isLastParagraphComplete, setIsLastParagraphComplete] = useState(false)
  const trackRef = useRef(null)
  const positionRef = useRef(0)
  const halfWidthRef = useRef(0)
  const getScrollSpeed = () => (window.matchMedia('(max-width: 640px)').matches ? 50 : 60)
  const [scrollSpeed, setScrollSpeed] = useState(() => {
    if (typeof window === 'undefined') return 60
    return getScrollSpeed()
  })

  const paragraphData = [
    {
      id: 1,
      title: 'Momen Indah',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 2,
      title: 'Cinta Sejati',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 3,
      title: 'Selamanya Bersama',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ]

  const handleParagraphComplete = useCallback(() => {
    setCurrentParagraphIndex(prev => {
      const nextIndex = prev + 1
      // If this is the last paragraph, mark it as complete
      if (nextIndex >= paragraphData.length) {
        setIsLastParagraphComplete(true)
        return prev
      }
      return nextIndex
    })
  }, [paragraphData.length])

  const galleryItems = [
    { src: '/foto-1.jpg', alt: 'Cantikkk🥰' },  
    { src: '/foto-4.jpg', alt: 'Genittt😋' },
    { src: '/foto-2.jpg', alt: 'Lucuu😘' },
    { src: '/foto-5.jpg', alt: 'Tatapannya loo🫠' },
    { src: '/foto-6.jpg', alt: 'Ngangeninn🥹' },
    { src: '/foto-3.jpg', alt: 'Manisss🍫' },
    { src: '/foto-7.jpg', alt: 'Gemashh🤏🏻'},
    { src: '/foto-8.jpg', alt: 'Imutt😘' }
    // { src: '/foto-9.jpg', alt: 'Momen lucu 9' },
    // { src: '/foto-10.jpg', alt: 'Momen lucu 10' }
  ]

  const handleReload = () => {
    setShowConfetti(true)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateMetrics = () => {
      halfWidthRef.current = track.scrollWidth / 2
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`
    }

    const handleResize = () => {
      setScrollSpeed(getScrollSpeed())
      updateMetrics()
    }

    // Delay to ensure DOM is fully rendered when gallery appears
    const timeoutId = setTimeout(() => {
      updateMetrics()
    }, 300)

    window.addEventListener('resize', handleResize)

    let observer
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateMetrics)
      observer.observe(track)
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
      if (observer) observer.disconnect()
    }
  }, [currentParagraphIndex, isLastParagraphComplete])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let rafId = 0
    let lastTime = performance.now()

    const tick = (now) => {
      const delta = now - lastTime
      lastTime = now

      if (isPlaying && isLastParagraphComplete) {
        const maxScroll = halfWidthRef.current
        if (maxScroll > 0) {
          positionRef.current += (scrollSpeed / 1000) * delta
          if (positionRef.current >= maxScroll) {
            positionRef.current -= maxScroll
          }
          track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isPlaying, scrollSpeed, currentParagraphIndex, isLastParagraphComplete])

  // Recalculate gallery metrics when images load
  useEffect(() => {
    if (!isLastParagraphComplete) return

    const track = trackRef.current
    if (!track) return

    const updateTrackMetrics = () => {
      halfWidthRef.current = track.scrollWidth / 2
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`
      
      // Force animation to restart by ensuring isPlaying state is synchronized
      // This helps the gallery auto-play after images are loaded
      console.log('Gallery metrics updated:', { scrollWidth: track.scrollWidth, halfWidth: halfWidthRef.current })
    }

    // Wait for images to fully load
    const images = track.querySelectorAll('img')
    let loadedCount = 0

    const handleImageLoad = () => {
      loadedCount++
      if (loadedCount === images.length) {
        // Increase delay to ensure proper DOM layout
        setTimeout(updateTrackMetrics, 200)
      }
    }

    if (images.length === 0) {
      updateTrackMetrics()
      return
    }

    images.forEach(img => {
      if (img.complete) {
        handleImageLoad()
      } else {
        img.addEventListener('load', handleImageLoad)
      }
    })

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad)
      })
    }
  }, [isLastParagraphComplete])

  // Ensure gallery auto-play starts smoothly after images load
  useEffect(() => {
    if (!isLastParagraphComplete) return

    const track = trackRef.current
    if (!track) return

    // Trigger one final metrics update to ensure animation starts properly
    const timeoutId = setTimeout(() => {
      const newHalfWidth = track.scrollWidth / 2
      if (newHalfWidth > 0) {
        halfWidthRef.current = newHalfWidth
        // Reset position to ensure smooth start
        if (positionRef.current === 0) {
          track.style.transform = 'translate3d(0, 0, 0)'
        }
      }
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [isLastParagraphComplete])

  const handleNudge = (step) => {
    const track = trackRef.current
    const maxScroll = halfWidthRef.current
    if (!track || maxScroll <= 0) return
    positionRef.current += step
    if (positionRef.current >= maxScroll) {
      positionRef.current -= maxScroll
    } else if (positionRef.current < 0) {
      positionRef.current += maxScroll
    }
    track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const heartVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  return (
    <div className='start-container page page-fade'>
      <div className='gradient-bg'></div>
      <div className='gradient-overlay'></div>
        <div className="min-h-screen bg-linear-to-b from-pink-900 via-red-900 to-black flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full">
                {/* Animated background hearts */}
                <div className="absolute inset-0 opacity-30">
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-6xl absolute left-0 top-0"
                  >
                    💕
                  </motion.div>
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="text-5xl absolute right-0 bottom-10"
                  >
                    💘
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-4xl absolute left-1/4 bottom-20"
                  >
                    💗
                  </motion.div>
                </div>

            {/* Main message content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 bg-linear-to-b from-white/10 to-white/20 backdrop-blur-sm border border-pink-300/30 rounded-3xl p-8 md:p-10 text-center"
            >
              <motion.h1
                variants={itemVariants}
                className="text-2xl md:text-3xl font-bold text-pink-200 mb-12 hidden sm:block"
              >
                💖 Happy Valentine's Day sayangg 💖
              </motion.h1>

              <motion.h1
                variants={itemVariants}
                className="text-2xl md:text-3xl font-bold text-pink-200 mb-12 sm:hidden"
              >
                Happy Valentine's Day sayangg
              </motion.h1>
            
              {/* Typewriter Messages */}
              {paragraphData.map((paragraph, index) => {
                // Show completed paragraphs as static text
                if (index < currentParagraphIndex) {
                  return (
                    <motion.div
                      key={paragraph.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-8"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-pink-300 mb-4">
                        {paragraph.title}
                      </h3>
                      <p className="text-pink-200 text-justify mb-8 text-sm md:text-lg">
                        {paragraph.content}
                      </p>
                    </motion.div>
                  )
                }
                
                // Show only the current paragraph with typewriter animation
                if (index === currentParagraphIndex) {
                  return (
                    <motion.div
                      key={paragraph.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mb-8"
                    >
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl md:text-2xl font-bold text-pink-300 mb-4"
                      >
                        {paragraph.title}
                      </motion.h3>
                      <TypewriterText
                        text={paragraph.content}
                        delay={200}
                        speed={60}
                        onComplete={handleParagraphComplete}
                      />
                    </motion.div>
                  )
                }
                
                return null
              })}

              {currentParagraphIndex >= paragraphData.length - 1 && isLastParagraphComplete && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-6xl mb-8 animate-heartbeat"
                  >
                    ❤️
                  </motion.div>

                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="gallery-shell"
                  >
                    <div className="gallery-header">
                      <div>
                        <p className="gallery-kicker">Galeri Pakket & Clinnn</p>
                        <h2 className="gallery-title">Momen kecil yg tak terlupakan🤗</h2>
                      </div>
                    </div>

                    <div className="gallery-controls">
                      <button
                        type="button"
                        className="control-btn control-btn--skip"
                        onClick={() => handleNudge(-220)}
                        aria-label="Sebelumnya"
                      >
                        ⏮
                      </button>
                      <button
                        type="button"
                        className="control-btn"
                        onClick={() => setIsPlaying((prev) => !prev)}
                        aria-label={isPlaying ? 'Jeda galeri' : 'Putar galeri'}
                      >
                        {isPlaying ? '❚❚' : '▶'}
                      </button>
                      <button
                        type="button"
                        className="control-btn control-btn--skip"
                        onClick={() => handleNudge(220)}
                        aria-label="Berikutnya"
                      >
                        ⏭
                      </button>
                    </div>

                    <div className="gallery-window">
                      <div className="gallery-track" ref={trackRef}>
                        {[...galleryItems, ...galleryItems].map((item, index) => (
                          <div className="gallery-item" key={`${item.src}-${index}`}>
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="gallery-img"
                            />
                            <div className="gallery-caption">{item.alt}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="gallery-note">
                      Lucu lucu kann fotonyaa, nanti kita banyakin lagi yaa🥹
                    </p>
                  </motion.section>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="flex justify-center gap-4 mb-8"
                  >
                    <motion.span
                      animate={{
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0
                      }}
                      className="text-2xl"
                    >
                      🧣
                    </motion.span>
                    <motion.span
                      animate={{
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.1
                      }}
                      className="text-2xl"
                    >
                      💖
                    </motion.span>
                    <motion.span
                      animate={{
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.2
                      }}
                      className="text-2xl"
                    >
                      🍫
                    </motion.span>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.7 }}
                    onClick={handleReload}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 40px rgba(236, 72, 153, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform shadow-lg"
                  >
                    Back to Home ↺
                  </motion.button>

                  {/* Confetti effect on button click */}
                  {showConfetti && (
                    <>
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            x: 0,
                            y: 0,
                            scale: 0,
                            opacity: 1
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 400,
                            y: (Math.random() - 0.5) * 400,
                            scale: [0, 1, 0.8],
                            opacity: [1, 1, 0],
                            rotate: Math.random() * 720
                          }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut"
                          }}
                          className="absolute text-2xl pointer-events-none"
                          style={{
                            left: '50%',
                            top: '80%'
                          }}
                        >
                          {['💕', '💖', '💗', '💝', '💘', '✨', '🎉'][i % 7]}
                        </motion.div>
                      ))}
                    </>
                  )}
                </>
              )}
            </motion.div>
        </div>
        </div>
    </div>
    
  )
}

export default Pesan
