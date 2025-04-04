import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyANtR7nUKxpn_Q6w3Txnue5cjVGPu3xpT0",
  authDomain: "bombcrypto-5c9c2.firebaseapp.com",
  projectId: "bombcrypto-5c9c2",
  storageBucket: "bombcrypto-5c9c2.appspot.com",
  messagingSenderId: "1070447910090",
  appId: "1:1070447910090:web:3edf881afbad9e88c86833",
};

let messaging: any;
let fireBaseApp: any;

if (typeof window !== "undefined") {
  fireBaseApp = initializeApp(firebaseConfig);
  messaging = getMessaging(fireBaseApp);
}

export { messaging, getToken, onMessage, fireBaseApp };
