import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// The page HTML is pre-rendered at build time (vite-prerender-plugin), so we
// hydrate the existing #root markup rather than creating it from scratch.
hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
