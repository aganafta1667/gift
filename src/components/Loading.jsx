import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/loading.css'
import PasswordModal from './PasswordModal'
import { preloadAssetsOptimistic } from '../utils/imagePreloader'

export default function Loading({ messages = null, messageInterval = 3000, expectedPassword = 'cinta', onSuccess = () => {} }) {
  const defaultMessages = [
    'loading...',
    'bentar yaa...',
    'nungguin ya??🤔🤔',
    'mwehehehee😊😊',
    'seperti biasa...',
    'verifikasi dulu yaa...'
  ]

  const msgs = messages || defaultMessages
  const [index, setIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [fade, setFade] = useState(true)
  const intervalRef = useRef(null)

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
    preloadAssetsOptimistic(publicAssets)

    // rotate messages, then show modal
    let i = 0
    intervalRef.current = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        i += 1
        setIndex((prev) => (prev + 1) % msgs.length)
        setFade(true)

        // if we've shown each message once, stop and show modal
        if (i >= msgs.length) {
          clearInterval(intervalRef.current)
          // small delay before showing modal
          setTimeout(() => setShowModal(true), 350)
        }
      }, 200) // short gap for fade out
    }, messageInterval)

    return () => clearInterval(intervalRef.current)
  }, [])

  const handleSubmit = (pw) => {
    if (pw === expectedPassword) {
      // return true untuk memberitahu PasswordModal password benar
      // jangan panggil onSuccess di sini, biarkan PasswordModal yang handle
      return true
    } else {
      // keep modal open and allow retry
      return false
    }
  }

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
          className="absolute text-3xl left-[40%] bottom-0"
        >
          🧣
        </motion.span>
        <motion.span
          animate={{
            y: [0, -100, -200, -300],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute text-3xl left-[60%] bottom-0"
        >
          🍫
        </motion.span>
        <motion.span
          animate={{
            y: [0, -100, -200, -300],
            opacity: [0, 1, 1, 0],
            rotate: [0, -360]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "linear",
            delay: 3
          }}
          className="absolute text-3xl left-[75%] bottom-0"
        >
          💓
        </motion.span>
      </div>

      {/* center content */}
      <div className="flex flex-col items-center gap-4 relative z-10">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-7xl"
        >
          ❤️
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-pink-200 text-xl"
          >
            {msgs[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {showModal && (
        <PasswordModal onSubmit={handleSubmit} onSuccess={onSuccess} />
      )}
    </div>
  )
}

