export async function scheduleNotification(
  title: string,
  options: NotificationOptions,
  scheduledTime: Date
) {
  const delay = scheduledTime.getTime() - Date.now();

  if (delay < 0 || !navigator.serviceWorker?.controller) return;

  setTimeout(() => {
    navigator.serviceWorker.controller?.postMessage({ title, options });
  }, delay);
}

interface NotificationOptions {
  body: string;
  icon?: string;
}
