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

self.addEventListener("push", function(event) {
  const payload = event.data.json();

  console.log("[firebase-messaging-sw.js] Received push message:", payload);

  const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.image,
    data: {
      url: payload.fcmOptions?.link || "https://google.com",
    },
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

self.addEventListener("notificationclick", function(event) {
  const url = event.notification.data?.url || "https://google.com";

  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
