import React from 'react'
import '../styles/start.css'

const Start = ({ onStartClick }) => {
  return (
    <div className='start-container page page-fade'>

      <div className='gradient-bg'></div>
      <div className='gradient-overlay'></div>
      <div className='start-content -translate-y-20 bg'>
        <div className='icon-wrapper float'>
          <i className="ri-heart-pulse-fill icon"></i>
        </div>
        <div className='bg-linear-to-r from-pink-300/20 to-red-200/20 backdrop-blur-sm border border-pink-300/30 rounded-3xl p-8 md:p-12 text-center items-center flex flex-col m-3'>
          <div className='power flex items-center sm:gap-10 gap-5'>
            <video src="/stk1.webm" autoPlay loop muted playsInline className="sm:w-20 w-8"></video>
            <img 
              src="/start.png" 
              alt="start" 
              className='sm:h-25 h-10 animate-zoom mb-0 cursor-pointer' 
              onClick={onStartClick}
            />
            <video src="/stk1.webm" autoPlay loop muted playsInline className="sm:w-20 w-8 scale-x-[-1]"></video>
          </div>
          <h1 className='heading font-bold lg:text-6xl md:text-5xl sm:text-4xl text-2xl md:p-5 p-3'>❤️Happy Valentine's Day❤️</h1>
          <p className='description'>This is the starting point of our application. Get ready for an amazing journey filled with love and excitement.</p>
          <div className="lope flex justify-center gap-4 mt-10 mb-1">
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💝</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>💖</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>💞</span>
            </div>
        </div>
        

      </div>
    </div>
  )
}

export default Start