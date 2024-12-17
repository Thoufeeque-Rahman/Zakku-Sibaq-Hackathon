// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH4VyxBAVFyXQNRgtOF5UAGiqvNANQJAI",
  authDomain: "sibaq-hackathon.firebaseapp.com",
  projectId: "sibaq-hackathon",
  storageBucket: "sibaq-hackathon.firebasestorage.app",
  messagingSenderId: "297822491554",
  appId: "1:297822491554:web:0985ce9449484978f798fb",
  measurementId: "G-XHJBWDC1XC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export const messaging = getMessaging(app)

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === 'granted') {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const token = await getToken(messaging, { vapidKey: "BGycvGkdFPW6HXLofVxDfuV5X-PHdPGSLIetCLSWipK3IGcfiXITu_1IDpIIgIAu1kftoQDezYeYk-SJJD5FiA4", serviceWorkerRegistration: registration });
      console.log(token);
    } else {
      console.error('Service Worker not supported in this browser');
    }
  }
};

export { app, db };