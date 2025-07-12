import { render } from "preact";
import { App } from "./App.tsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/todo-list/sw.js")
      .then((reg) => {
        console.log("Service Worker register successfully:", reg);
      })
      .catch((err) => {
        console.error("Error registering SW:", err);
      });
  });
}

const ensurePermission = async () => {
  const permission = await Notification.requestPermission();
  return permission === "granted";
};

render(<App />, document.getElementById("app")!);

await ensurePermission();
