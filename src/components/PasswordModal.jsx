import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PasswordModal({
  onSubmit = () => {},
  onSuccess = () => {}
}) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [attemptCount, setAttemptCount] = useState(0)
  const inputRef = useRef(null)
  const timerRef = useRef(null)
  const hasCalledSuccess = useRef(false)

  // 10 pesan error berbeda yang akan berganti-ganti
  const errorMessages = [
    'Aihhh, masak lupa sii?🤨',
    'Diinget inget lagi ihh',
    'Kok masi salah sii',
    'ishh ishhh',
    'dah berkali kali loo😒',
    'kenal pakket gk sii, masa lupaa',
    'ahh tauk dehh',
    'taukk🙄',
    'dah badmood akuu',
    'bye byeee👋👋',
    'byeee',
    'BYEEEE'
  ]

  // Memoize onSuccess untuk menghindari infinite loop
  const memoizedOnSuccess = useCallback(() => {
    if (hasCalledSuccess.current) return
    hasCalledSuccess.current = true
    onSuccess()
  }, [onSuccess])

  useEffect(() => {
    if (!showVideo) {
      hasCalledSuccess.current = false
      setCountdown(3)
      return
    }

    // Countdown dari 3 ke 0
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Timer 3 detik untuk pindah halaman
    timerRef.current = setTimeout(() => {
      memoizedOnSuccess()
    }, 3000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      clearInterval(countdownInterval)
    }
  }, [showVideo, memoizedOnSuccess])

  // Reset attempt count saat modal ditutup/reset
  useEffect(() => {
    if (!showVideo && !isSuccess) {
      setAttemptCount(0)
      setError('')
    }
  }, [showVideo, isSuccess])

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = onSubmit(value)

    if (ok === false) {
      // Pilih pesan error dari array 10 pesan
      const errorIndex = attemptCount % errorMessages.length
      setError(errorMessages[errorIndex])
      setAttemptCount(attemptCount + 1)
      setValue('')
      inputRef.current?.focus()
    } else {
      setIsSuccess(true)
      // Delay before showing video
      setTimeout(() => {
        setShowVideo(true)
      }, 400)
    }
  }

  // Floating hearts for video decoration
  const floatingHearts = ['💕', '💖', '💗', '💝', '💘']

  return (
    <>
      <AnimatePresence>
        {!showVideo && !isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-xl text-center relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer-effect pointer-events-none"></div>
              
              <h3 className="text-white text-lg font-semibold mb-2">
                Masukkan kata sandi
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <motion.input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                    setError('')
                  }}
                  type="password"
                  className="px-3 py-2 text-white rounded-md transition-all duration-300 ring-1 ring-white/50 focus:ring-2 focus:ring-pink-400/90 focus:outline-none"
                  whileFocus={{ scale: 1.02 }}
                  animate={error ? {
                    x: [0, -10, 10, -10, 10, 0],
                    transition: { duration: 0.4 }
                  } : {}}
                />

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-400"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-4 py-2 bg-linear-to-r from-pink-500 to-red-500 rounded-md text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50"
                >
                  Submit
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            {/* Floating hearts decoration */}
            {floatingHearts.map((heart, idx) => (
              <motion.div
                key={idx}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.8],
                  x: (idx - 2) * 120,
                  y: [0, -30, -60, -100],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2,
                  delay: idx * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute text-4xl pointer-events-none"
                style={{ 
                  left: '50%',
                  top: '50%'
                }}
              >
                {heart}
              </motion.div>
            ))}

            {/* Video container with animations */}
            <motion.div
              initial={{ 
                scale: 0.7,
                opacity: 0,
                filter: 'blur(10px)',
                rotate: -3
              }}
              animate={{ 
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                rotate: 0
              }}
              exit={{
                scale: 0.5,
                opacity: 0,
                transition: { duration: 0.4 }
              }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.6
              }}
              className="relative"
            >
              {/* Pulsing glow effect */}
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-linear-to-r from-pink-500 to-red-500 rounded-xl blur-xl opacity-50"
              ></motion.div>

              {/* Video element */}
              <video
                src="/stk2.webm"
                loop
                autoPlay
                muted
                playsInline
                controls={false}
                onEnded={memoizedOnSuccess}
                className="relative w-72 rounded-xl shadow-2xl border-2 border-pink-300/50"
              />

              {/* Countdown indicator */}
              {countdown > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                >
                  <div className="relative w-16 h-16">
                    {/* Progress ring */}
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="4"
                        fill="none"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 1 }}
                        animate={{ pathLength: countdown / 3 }}
                        transition={{ duration: 1, ease: "linear" }}
                        strokeDasharray="175.93"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Countdown number */}
                    <motion.div
                      key={countdown}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold"
                    >
                      {countdown}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Corner sparkles */}
              {[0, 1, 2, 3].map((corner) => (
                <motion.div
                  key={corner}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: corner * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="absolute text-2xl"
                  style={{
                    top: corner < 2 ? '-10px' : 'auto',
                    bottom: corner >= 2 ? '-10px' : 'auto',
                    left: corner % 2 === 0 ? '-10px' : 'auto',
                    right: corner % 2 === 1 ? '-10px' : 'auto'
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
