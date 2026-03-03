import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ConsultationPage from './ConsultationPage.jsx'
import './index.css'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const isConsultationPage = pathname === '/consultation'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isConsultationPage ? <ConsultationPage /> : <App />}
  </React.StrictMode>,
)
