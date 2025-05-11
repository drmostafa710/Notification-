// // Firebase Messaging Service Worker
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";

// import {
//   getMessaging,
//   onBackgroundMessage,
// } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-messaging.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyBqzGlq5Qukfk1WKzRCl9L8ndH2FnAct7k",
//   authDomain: "qzapp-3db60.firebaseapp.com",
//   projectId: "qzapp-3db60",
//   storageBucket: "qzapp-3db60.appspot.com",
//   messagingSenderId: "512223543409",
//   appId: "1:512223543409:web:8167a582ef6f5a37661bd0",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// Firebase Messaging Service Worker
self.addEventListener("push", (event) => {
  const payload = event.data.json();
  console.log(payload.notification); // Debug the payload
  const notif = payload.notification || payload; // Handle FCM structure

  event.waitUntil(
    self.registration
      .showNotification(notif.title, {
        body: notif.body || "Default Body",
      })
      .catch((err) => {
        console.error("Failed to show notification:", err);
      })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification?.title || "Default Title";
//   const notificationOptions = {
//     body: payload.notification?.body || "Default Body",
//     icon: payload.notification?.image || "/default-icon.png",
//     data: { url: payload.data?.link || "https://example.com" },
//     tag: "my-tag",
//   };

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });
