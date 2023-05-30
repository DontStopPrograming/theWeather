import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'

import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack';

// This should be in the .env.local but apparantly due to have it free, doesnt allow me
const API_KEY = "2828ec4699bc42c09cf185410232805"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider>
      <CssBaseline />
      <App apiKey = {API_KEY}/>
    </SnackbarProvider>
  </React.StrictMode>,
)
