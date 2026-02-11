import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import Start from './components/Start'
import Loading from './components/Loading'
import Pesan from './components/Pesan'
import HeartCursor from './components/HeartCursor'
import PasswordModal from './components/PasswordModal'

function App() {
  const [currentPage, setCurrentPage] = useState('start') // 'start', 'loading', 'pesan'

  const handleStartClick = () => {
    setCurrentPage('loading')
  }

  const handleUnlock = () => {
    
    setCurrentPage('pesan')
  }

  // default password for the demo
  const expectedPassword = 'cinta'

  // Page transition variants
  const pageVariants = {
    initial: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  }

  return (
    <>
      <HeartCursor />
      <AnimatePresence mode="wait">
        {currentPage === 'start' && (
          <motion.div
            key="start"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Start onStartClick={handleStartClick} />
          </motion.div>
        )}
        {currentPage === 'loading' && (
          <motion.div
            key="loading"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Loading expectedPassword={expectedPassword} onSuccess={handleUnlock} />
          </motion.div>
        )}
        {currentPage === 'pesan' && (
          <motion.div
            key="pesan"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Pesan />
          </motion.div>
        )}
      </AnimatePresence>
      {/* <Start />
      <Loading />
      <PasswordModal />
      <Pesan /> */}
    </>
  )
}

export default App
