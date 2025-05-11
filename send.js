// document.querySelector(".send").addEventListener("click", async () => {
//     const res = await fetch('send.php')
//     const result = await res.json()

//     console.log(result)
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";

import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-messaging.js";

// Your web app's Firebase configuration
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

let send = document.querySelector(".send");

send.onclick = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      navigator.serviceWorker
        .register("/sw.js", {
          type: "module",
        })
        .then((register) => {
          getToken(messaging, {
            serviceWorkerRegistration: register,
            vapidKey:
              "BBajxOpkkdCoOO8ezHTIUx6QIpu5sk3WbiUCNkio1l520waR5KEgYuHa01vyzDl0fbq3rIi3gy6fqt4QF5zbkSI",
          })
            .then((currentToken) => {
              if (currentToken) {
                console.log("Token:", currentToken);
                const tokenElement = document.createElement("p");
                tokenElement.textContent = currentToken;
                document.querySelector(".token").appendChild(tokenElement);
              } else {
                console.log("No token available.");
              }
            })
            .catch((err) => {
              console.error("Token retrieval failed:", err.code, err.message);
            });
        });
    } else {
      const tokenElement = document.createElement("p");
      tokenElement.textContent = "Permission denied.";
      document.querySelector(".token").appendChild(tokenElement);
    }
  });
};
