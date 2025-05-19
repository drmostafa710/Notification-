// Firebase Messaging Service Worker
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getMessaging,
  onBackgroundMessage,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-messaging-sw.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqzGlq5Qukfk1WKzRCl9L8ndH2FnAct7k",
  authDomain: "qzapp-3db60.firebaseapp.com",
  projectId: "qzapp-3db60",
  storageBucket: "qzapp-3db60.appspot.com",
  messagingSenderId: "512223543409",
  appId: "1:512223543409:web:8167a582ef6f5a37661bd0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// // Handle push from PHP backend payload
// self.addEventListener("push", (event) => {
//   const payload = event.data.json();
//   console.log("Push event received:", payload.notification.click_action);

//   // Structure per your PHP format
//   const title = payload.notification?.title || "No Title";
//   const body = payload.notification?.body || "No Body";
//   const icon = payload.notification?.image || "/default-icon.png";
//   const clickUrl = payload.notification.click_action;

//   const options = {
//     body: body,
//     icon: icon,
//     data: {
//       url: clickUrl,
//     },
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
  
//   self.addEventListener("notificationclick", (event) => {
  
//     console.log(event)
    
//     const urlToOpen = clickUrl || "https://google.com";
//     event.waitUntil(clients.openWindow(urlToOpen));
    
//     event.notification.close();
//   });
// });


// // Background message handler (via FCM when app is in background)
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload.fcmOptions.link
  );


  
  const notificationTitle = payload.notification?.title || "Default Title";
  const notificationOptions = {
    body: payload.notification?.body ,
    icon: payload.notification?.image ,
    data: {
      url: payload.fcmOptions.link,
    }
  };

  self.addEventListener("notificationclick", (event) => {
  
    console.log(event)
    
    const urlToOpen = payload.fcmOptions.link || "https://google.com";
    event.waitUntil(clients.openWindow(urlToOpen));
    
    event.notification.close();
  });
  
  
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
