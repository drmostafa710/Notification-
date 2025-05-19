self.addEventListener("push", function(event) {
  const payload = event.data.json();

  console.log("[firebase-messaging-sw.js] Received push message:", payload.fcmOptions?.link);

  const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.image,
    data: {
      url: payload.fcmOptions?.link || "https://quiz-app.infinityfreeapp.com/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );

  self.addEventListener("notificationclick", function(event) {
    const url = payload.fcmOptions?.link;

    event.waitUntil(clients.openWindow(url));
    
    event.notification.close();
  });
});


