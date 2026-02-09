import { useEffect, useState, useRef } from 'react'
import '../styles/loading.css'
import PasswordModal from './PasswordModal'

export default function Loading({ messages = null, messageInterval = 3000, expectedPassword = 'cinta', onSuccess = () => {} }) {
  const defaultMessages = [
    'Loading...',
    'Sabar yaa...',
    'Nungguin ya??🤔🤔',
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
        <span className="heart-float left-[20%]">💖</span>
        <span className="heart-float left-[40%] delay-200">🧣</span>
        <span className="heart-float left-[60%] delay-500">🍫</span>
        <span className="heart-float left-[75%] delay-700">💓</span>
      </div>

      {/* center content */}
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className="text-7xl animate-heartbeat">❤️</div>

        <p className={`text-pink-200 message ${fade ? 'fade-in' : 'fade-out'}`}>
          {msgs[index]}
        </p>
      </div>

      {showModal && (
        <PasswordModal onSubmit={handleSubmit} onSuccess={onSuccess} />
      )}
    </div>
  )
}

