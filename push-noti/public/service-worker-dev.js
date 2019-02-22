self.addEventListener("push", event => {
  const title = "Push Noti";
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
