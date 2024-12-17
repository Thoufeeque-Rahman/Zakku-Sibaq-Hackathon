import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { FirebaseContext } from './store/firebaseContext.js'
import { app as firebase } from './firebase/config.js'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseContext.Provider value={{ firebase }}>
      <Router>
        <App /> 
      </Router>
    </FirebaseContext.Provider>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/build/sw.js').then(
      (registration) => {
        console.log('ServiceWorker registered successfully!');
        console.log('Scope: ', registration.scope);
      },
      (error) => {
        console.error('ServiceWorker registration failed. Error:', error);
      }
    );
  });
  self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
      caches.open('assets-cache').then(cache => {
        console.log('Caching assets...');
        return cache.addAll(['/index.html', '/styles.css', '/image.png']);
      })
    );
  });
  self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
  });
  self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
  });
  
}

