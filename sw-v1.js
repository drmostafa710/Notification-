self.addEventListener("push", function(event) {
  const payload = event.data.json();
  const url = payload.fcmOptions?.link;

  console.log("[firebase-messaging-sw.js] Received push message:", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.image || "/default-icon.png",
    data: {
      url: url || "https://quiz-app.infinityfreeapp.com/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// ✅ Must be outside the push event
self.addEventListener("notificationclick", function(event) {
  const urlToOpen = event.notification.data?.url || "https://quiz-app.infinityfreeapp.com/";

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Try to focus an open tab with the same URL
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // If not open, open a new tab
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
