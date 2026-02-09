import { useEffect, useRef, useState, useCallback } from 'react'

export default function PasswordModal({
  onSubmit = () => {},
  onSuccess = () => {}
}) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const inputRef = useRef(null)
  const timerRef = useRef(null)
  const hasCalledSuccess = useRef(false)

  // Memoize onSuccess untuk menghindari infinite loop
  const memoizedOnSuccess = useCallback(() => {
    if (hasCalledSuccess.current) return
    hasCalledSuccess.current = true
    onSuccess()
  }, [onSuccess])

  useEffect(() => {
    if (!showVideo) {
      hasCalledSuccess.current = false
      return
    }

    // Timer 3 detik
    timerRef.current = setTimeout(() => {
      memoizedOnSuccess()
    }, 3000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [showVideo, memoizedOnSuccess])

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = onSubmit(value)

    if (ok === false) {
      setError('Kata sandi salah, coba lagi')
      setValue('')
      inputRef.current?.focus()
    } else {
      setShowVideo(true)
    }
  }

  return (
    <>
      {!showVideo && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl text-center">
            <h3 className="text-white text-lg font-semibold mb-2">
              Masukkan kata sandi
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  setError('')
                }}
                type="password"
                className="px-3 py-2 rounded-md"
              />

              {error && (
                <div className="text-sm text-red-400">{error}</div>
              )}

              <button className="mt-4 px-4 py-2 bg-blue-600 rounded-md text-white">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <video
            src="/stk1.webm" loop
            autoPlay
            muted
            playsInline
            controls={false}
            onEnded={memoizedOnSuccess}
            className="w-72 rounded-xl"
          />
        </div>
      )}
    </>
  )
}
