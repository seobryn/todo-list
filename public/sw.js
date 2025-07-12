self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
});

self.addEventListener("message", (event) => {
  const { title, options } = event.data;

  self.registration.showNotification(title, options);
});
