import React from 'react'
import { motion } from 'framer-motion'
import '../styles/start.css'

const Start = ({ onStartClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <div className='start-container page page-fade'>

      <div className='gradient-bg'></div>
      <div className='gradient-overlay'></div>
      <motion.div 
        className='start-content -translate-y-20 bg'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className='icon-wrapper float mt-25'
          variants={itemVariants}
        >
          <div className='text-7xl'>💖</div>
          {/* <i className="ri-heart-pulse-fill icon"></i> */}
        </motion.div>
        <div className='bg-linear-to-r from-pink-300/20 to-red-200/20 backdrop-blur-sm border border-pink-300/30 rounded-3xl p-8 md:p-12 text-center items-center flex flex-col m-0'>
          <motion.div 
            className='power flex items-center sm:gap-10 gap-5'
            variants={itemVariants}
          >
            <video src="/stk1.webm" autoPlay loop muted playsInline className="sm:w-20 w-8"></video>
            <motion.img 
              src="/start.png" 
              alt="start" 
              className='sm:h-25 h-10 animate-zoom mb-0 cursor-pointer' 
              onClick={onStartClick}
              whileHover={{ 
                scale: 1.1,
                filter: "drop-shadow(0 0 20px rgba(255, 107, 157, 0.8))"
              }}
              whileTap={{ 
                scale: 0.9,
                rotate: [0, -5, 5, -5, 0]
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <video src="/stk1.webm" autoPlay loop muted playsInline className="sm:w-20 w-8 scale-x-[-1]"></video>
          </motion.div>
          <motion.h1 
            className='heading font-bold lg:text-6xl md:text-5xl sm:text-4xl text-2xl md:p-5 p-3 hidden sm:block'
            variants={itemVariants}
          >
            ❤️Happy Valentine's Day❤️
          </motion.h1>
          <motion.h1 
            className='heading font-bold lg:text-6xl md:text-5xl sm:text-4xl text-2xl md:p-5 p-3 sm:hidden'
            variants={itemVariants}
          >
            Happy Valentine's Day Clinnku
          </motion.h1>
          <motion.p 
            className='description'
            variants={itemVariants}
          >
            💌 Klik start untuk melihat pesan dari pakket yaaa 💌
          </motion.p>
          <motion.div 
            className="lope flex justify-center gap-4 mt-10 mb-1"
            variants={itemVariants}
          >
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🧣</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>💖</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🍫</span>
            </motion.div>
        </div>
        

      </motion.div>
    </div>
  )
}

export default Start