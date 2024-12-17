importScripts('https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCH4VyxBAVFyXQNRgtOF5UAGiqvNANQJAI",
    authDomain: "sibaq-hackathon.firebaseapp.com",
    projectId: "sibaq-hackathon",
    storageBucket: "sibaq-hackathon.firebasestorage.app",
    messagingSenderId: "297822491554",
    appId: "1:297822491554:web:0985ce9449484978f798fb",
    measurementId: "G-XHJBWDC1XC"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});