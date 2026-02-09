import React from 'react'
import '../styles/start.css'

const Pesan = () => {
  return (
    <div className='start-container page page-fade'>
      <div className='gradient-bg'></div>
      <div className='gradient-overlay'></div>
        <div className="min-h-screen bg-linear-to-b from-pink-900 via-red-900 to-black flex items-center justify-center p-4">
            <div className="relative max-w-2xl w-full">
                {/* Animated background hearts */}
                <div className="absolute inset-0 opacity-30">
                <div className="text-6xl animate-bounce absolute left-0 top-0">💕</div>
                <div className="text-5xl absolute right-0 bottom-10">💘</div>
                <div className="text-4xl animate-pulse absolute left-1/4 bottom-20">💗</div>
            </div>

            {/* Main message content */}
            <div className="relative z-10 bg-linear-to-r from-pink-500/20 to-red-500/20 backdrop-blur-sm border border-pink-300/30 rounded-3xl p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-pink-200 mb-6">
                ✨ Selamat Datang ✨
            </h1>
            
            <div className="text-6xl mb-8 animate-heartbeat">
                ❤️
            </div>

            <p className="text-lg md:text-xl text-pink-100 mb-6 leading-relaxed">
                Terima kasih sudah datang ke sini. Anda telah membuat hari saya lebih bermakna dengan kehadiran Anda.
            </p>

            <p className="text-pink-200 mb-8 text-base md:text-lg">
                Dengan penuh kasih dan kehangatan, saya ingin mengatakan bahwa Anda adalah yang terbaik.
            </p>

            <div className="flex justify-center gap-4 mb-8">
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💝</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>💖</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>💞</span>
            </div>

            <button 
                onClick={() => window.location.reload()}
                className="mt-8 px-8 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            >
                Mulai Lagi ↺
            </button>
            </div>
        </div>
        </div>
    </div>
    
  )
}

export default Pesan
