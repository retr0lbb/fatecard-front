import { StrictMode } from 'react'
import { BrowserRouter } from "react-router"
import { createRoot } from 'react-dom/client'
import './index.css'
import { MyRouter } from './router/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MyRouter/>
    </BrowserRouter>
  </StrictMode>
)
