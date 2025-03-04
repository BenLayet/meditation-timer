import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './edges.css';
import './colors.css';
import './typography.css';
import './button.css';
import './range.css';
import './animation.css';
import './layout.css';
import './index.css';
import App from './components/app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/ServiceWorker.js').then(
            (registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            },
            (err) => {
                console.log('Service Worker registration failed:', err);
            }
        );
    });
}