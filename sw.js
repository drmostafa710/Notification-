self.addEventListener("push", function(event) {
  const payload = event.data.json();
  const url = payload.fcmOptions?.link;

  console.log("[firebase-messaging-sw.js] Received push message:", payload.fcmOptions?.link);

  const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.image,
    data: {
      url: url || "https://quiz-app.infinityfreeapp.com/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );

  self.addEventListener("notificationclick", function(event) {

    event.waitUntil(clients.openWindow(url));
    
    event.notification.close();
  });
});


