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
