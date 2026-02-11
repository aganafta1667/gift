import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'remixicon/fonts/remixicon.css'
import Pesan from './components/Pesan.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Pesan /> */}
  </StrictMode>,
)
