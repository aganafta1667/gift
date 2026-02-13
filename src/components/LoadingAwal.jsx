import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import '../styles/loading.css'

export default function LoadingAwal({ onLoadComplete = () => {} }) {
  const [currentMessage, setCurrentMessage] = useState('loading...')
  const [fade, setFade] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const messageIntervalRef = useRef(null)
  const loadTimeoutRef = useRef(null)

  const messages = [
    'loading...',
    'sabar yaa...',
  ]

  useEffect(() => {
    const publicAssets = [
      '/bunga.png',
      '/cokelat.png',
      '/foto-1.jpg',
      '/foto-2.jpg',
      '/foto-3.jpg',
      '/foto-4.jpg',
      '/foto-5.jpg',
      '/foto-6.jpg',
      '/foto-7.jpg',
      '/foto-8.jpg',
      '/image.png',
      '/kadobuka.png',
      '/kadotutup.png',
      '/start.png',
      '/stk1.webm',
      '/stk2.webm',
      '/surat.png',
      '/suratbuka.png',
      '/valentine.png',
      '/vite.svg'
    ]

    // Start message rotation immediately
    let messageIndex = 0
    messageIntervalRef.current = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length
        setCurrentMessage(messages[messageIndex])
        setFade(true)
      }, 200)
    }, 1500)

    // Start preloading assets
    let loadedCount = 0
    const totalAssets = publicAssets.length

    publicAssets.forEach((url) => {
      const lowerUrl = url.toLowerCase()
      if (lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.ogg')) {
        const video = document.createElement('video')
        video.preload = 'auto'
        video.onloadeddata = () => {
          loadedCount++
          setLoadingProgress(Math.round((loadedCount / totalAssets) * 100))
          if (loadedCount === totalAssets) {
            // All assets loaded, wait a bit before completing
            loadTimeoutRef.current = setTimeout(() => {
              clearInterval(messageIntervalRef.current)
              onLoadComplete()
            }, 1000)
          }
        }
        video.onerror = () => {
          loadedCount++
          setLoadingProgress(Math.round((loadedCount / totalAssets) * 100))
          if (loadedCount === totalAssets) {
            loadTimeoutRef.current = setTimeout(() => {
              clearInterval(messageIntervalRef.current)
              onLoadComplete()
            }, 1000)
          }
        }
        video.src = url
        video.load()
      } else {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          setLoadingProgress(Math.round((loadedCount / totalAssets) * 100))
          if (loadedCount === totalAssets) {
            loadTimeoutRef.current = setTimeout(() => {
              clearInterval(messageIntervalRef.current)
              onLoadComplete()
            }, 1000)
          }
        }
        img.onerror = () => {
          loadedCount++
          setLoadingProgress(Math.round((loadedCount / totalAssets) * 100))
          if (loadedCount === totalAssets) {
            loadTimeoutRef.current = setTimeout(() => {
              clearInterval(messageIntervalRef.current)
              onLoadComplete()
            }, 1000)
          }
        }
        img.src = url
      }
    })

    return () => {
      clearInterval(messageIntervalRef.current)
      clearTimeout(loadTimeoutRef.current)
    }
  }, [onLoadComplete])

  return (
    <div className="page page-fade h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.span
          animate={{
            y: [0, -100, -200, -300],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute text-3xl left-[20%] bottom-0"
        >
          💖
        </motion.span>
        <motion.span
          animate={{
            y: [0, -100, -200, -300],
            opacity: [0, 1, 1, 0],
            rotate: [0, -360]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
          className="absolute text-2xl right-[15%] bottom-0"
        >
          💝
        </motion.span>
      </div>

      {/* loading content */}
      <motion.div
        className="text-center z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated text */}
        <motion.h1
          className={`text-lg md:text-xl font-bold bg-linear-to-r from-pink-400 to-red-400 bg-clip-text text-transparent transition-opacity duration-300 ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
          key={currentMessage}
        >
          {currentMessage}
        </motion.h1>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-pink-400 to-red-400"
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress text */}
        <p className="text-gray-400 text-sm">
          {loadingProgress}%
        </p>
      </motion.div>
    </div>
  )
}
