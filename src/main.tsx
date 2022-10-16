
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyle from './global.style'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <GlobalStyle/>
    <BrowserRouter>
      <AuthProvider>
          <App />
      </AuthProvider>
    </BrowserRouter>
  </>
)
