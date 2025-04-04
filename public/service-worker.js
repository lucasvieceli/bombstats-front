// let socket;
// let websocketUrl;

// self.addEventListener("install", (event) => {
//   console.log("Service Worker installing.");
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service Worker activating.");
//   event.waitUntil(self.clients.claim());
//   checkClients();
// });

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "INIT_ENV") {
//     websocketUrl = event.data.payload.websocketUrl;
//   }

//   if (event.data && event.data.type === "CHECK_CLIENTS") {
//     checkClients();
//   }
// });

// async function setupWebSocket() {
//   const { io } = await import(
//     "https://cdn.jsdelivr.net/npm/socket.io-client@4.7.1/+esm"
//   );

//   socket = io(websocketUrl);
//   console.log("websocketUrl", websocketUrl);

//   socket.on("connect", () => {
//     console.log("WebSocket connection established");
//   });

//   socket.on("message", (data) => {
//     console.log("Message from server", data);
//     broadcastMessage(data);
//   });

//   socket.on("disconnect", () => {
//     console.log("WebSocket connection closed");
//     socket = null;
//   });
// }

// function checkClients() {
//   self.clients.matchAll().then((clients) => {
//     if (clients.length > 0) {
//       if (!socket) {
//         setupWebSocket();
//       }
//     } else if (clients.length === 0 && socket) {
//       socket.disconnect();
//       socket = null;
//     }
//   });
// }

// function broadcastMessage(message) {
//   self.clients.matchAll().then((clients) => {
//     clients.forEach((client) =>
//       client.postMessage({ type: "WEBSOCKET_MESSAGE", data: message })
//     );
//   });
// }
