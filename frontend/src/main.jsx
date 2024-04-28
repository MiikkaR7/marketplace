import React from 'react'
import ReactDOM from 'react-dom/client'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App.jsx'
import './index.css'

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '2rem',
  transition: transitions.SCALE
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </React.StrictMode>,
)
