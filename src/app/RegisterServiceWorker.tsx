"use client";

import { firebaseConfig, messaging } from "@/util/firebase";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { Workbox } from "workbox-window";
import "firebase/messaging";
import { useRouter } from "next/navigation";

function RegisterServiceWorker() {
  const router = useRouter();
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     const wb = new Workbox("/service-worker.js");

  //     wb.addEventListener("installed", (event) => {
  //       if (event.isUpdate) {
  //         if (confirm("New content is available, refresh?")) {
  //           window.location.reload();
  //         }
  //       }
  //     });

  //     wb.register().then(() => {
  //       navigator.serviceWorker.ready.then((registration) => {
  //         console.log("INIT_ENV mandou");

  //         registration.active?.postMessage({
  //           type: "INIT_ENV",
  //           payload: {
  //             websocketUrl: process.env.NEXT_PUBLIC_API_URL,
  //           },
  //         });
  //         registration.active?.postMessage({ type: "CHECK_CLIENTS" });
  //       });
  //       navigator.serviceWorker.ready.then((registration) => {
  //         console.log("CHECK_CLIENTS mandou");
  //         registration.active?.postMessage({ type: "CHECK_CLIENTS" });
  //       });

  //       navigator.serviceWorker.addEventListener("message", (event) => {
  //         if (event.data && event.data.type === "WEBSOCKET_MESSAGE") {
  //           handleWebSocketMessage(event.data.data);
  //         }
  //       });
  //     });

  //     window.addEventListener("focus", () => {
  //       console.log("CHECK_CLIENTS focus mandou");
  //       navigator.serviceWorker.ready.then((registration) => {
  //         registration.active?.postMessage({ type: "CHECK_CLIENTS" });
  //       });
  //     });

  //     window.addEventListener("blur", () => {
  //       console.log("CHECK_CLIENTS blur mandou");
  //       navigator.serviceWorker.ready.then((registration) => {
  //         registration.active?.postMessage({ type: "CHECK_CLIENTS" });
  //       });
  //     });
  //   }
  // }, []);

  // function handleWebSocketMessage(message: any) {
  //   console.log("Message from WebSocket:", message);
  //   // Handle the WebSocket message here
  // }

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(async (registration) => {
          await registration.update();
          console.log("Service Worker registered updated: ", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });

      onMessage(messaging, (payload: any) => {
        console.log("Message received. ", payload);

        const { title, body, icon, ...data } = payload.data;
        const notificationOptions = {
          body,
          icon,
          data,
        };
        const notification = new Notification(title, notificationOptions);
        notification.addEventListener("click", () => {
          router.push(data.url);
        });
      });
    }
  }, []);

  return null;
}

export default RegisterServiceWorker;
