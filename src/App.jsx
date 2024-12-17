import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Pages/General/Auth/Login';
import Signup from './Components/Pages/General/Auth/Signup';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import GetStarted from './Components/Pages/GetStarted/GetStarted';
import './App.css'
import { useEffect, useState } from 'react';
import Home from './Components/Pages/General/Home/Home';
import { getAuth } from 'firebase/auth';
import GeneralPage from './Components/Pages/General/GeneralPage';
import DonorPage from './Components/Pages/Donor/DonorPage';
import Profile from './Components/Pages/General/Settings-profile/Profile';
import MahalRP from './Components/Pages/MahalRP/MahalRP';
import ClaimantPage from './Components/Pages/Claimant/ClaimantPage';
import QRCodeImageScanner from './Components/Components/QrCodeReader/QrCodeReader';
import BlogPage from './Components/Pages/General/Blog/BlogPage';
import Vakeel from './Components/Pages/Vakeel/Vakeel';
import HelpAndSupport from './Components/Pages/General/HelpAndSupport/HelpAndSupport';
import { generateToken, messaging } from './firebase/config';
import { onMessage } from 'firebase/messaging';




function App() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate loading (replace with your actual loading logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust loading time as needed

    generateToken();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);

    });
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className='app-container' style={{ borderRadius: '12px' }}>
      <Routes>
        <Route path='/' element={<Navigate to={'/getStarted'} />} />
        <Route path='/splashScreen' element={<SplashScreen />} />
        <Route path='/getStarted' element={isLoading ? <SplashScreen /> : <GetStarted />} />
        <Route path='/help-and-support' element={<HelpAndSupport />} />
        <Route path='/general' element={<SplashScreen />} />
        <Route path='/general/login' element={<Login general={true} userMode='General' />} />
        <Route path='/general/signup' element={<Signup general={true} userMode='General' />} />
        <Route path='/general/home/*' element={<GeneralPage />} />
        <Route path='/general/profile' element={<Profile />} />
        <Route path='/general/blog' element={<BlogPage />} />
        <Route path='/general/donor/*' element={<DonorPage />} />
        <Route path='/general/claimant/*' element={<ClaimantPage />} />
        <Route path='/general/mahal/*' element={<MahalRP />} />
        <Route path='/general/vakeel/*' element={<Vakeel />} />
        <Route path='/qr' element={<QRCodeImageScanner />} />
        <Route path="*" element={<Navigate to={'/getStarted'} />} />


      </Routes>
    </div>
  );
}

export default App
