import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ConsultationPage from './ConsultationPage.jsx'
import ContentAutomationPage from './ContentAutomationPage.jsx'
import './index.css'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const isConsultationPage = pathname === '/consultation'
const isContentAutomationPage = pathname === '/content-automation'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isConsultationPage ? <ConsultationPage /> : isContentAutomationPage ? <ContentAutomationPage /> : <App />}
  </React.StrictMode>,
)
