import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { AppProvider } from './context/AppContext.tsx' // ดึงไฟลร์ context เข้ามา เพราะว่าพวกผมเก็บ ข้อมูล user and admin ไว้ในนี้ ให้เป็นสูนย์กลาง

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
