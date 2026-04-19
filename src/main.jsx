import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import './i18n';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <main className="text-foreground min-h-screen">
          <App />
        </main>
      </BrowserRouter>
    </HeroUIProvider>
  </React.StrictMode>
);
