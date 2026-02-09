import { useState } from 'react'
import './App.css'
import Start from './components/start'
import Loading from './components/loading'
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

  return (
    <>
      <HeartCursor />
      {currentPage === 'start' && <Start onStartClick={handleStartClick} />}
      {currentPage === 'loading' && (
        <Loading expectedPassword={expectedPassword} onSuccess={handleUnlock} />
      )}
      {currentPage === 'pesan' && <Pesan />}
      {/* <Start />
      <Loading />
      <PasswordModal />
      <Pesan /> */}
    </>
  )
}

export default App
