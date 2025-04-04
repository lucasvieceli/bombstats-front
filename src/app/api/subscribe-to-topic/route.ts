import { NextResponse } from "next/server";
import admin from "firebase-admin";
var serviceAccount = require("@/../firebase.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(req: any) {
  const { token, topic, subscribe } = await req.json();

  try {
    if (subscribe) {
      await admin.messaging().subscribeToTopic(token, topic);
    } else {
      const t = await admin.messaging().unsubscribeFromTopic(token, topic);
      console.log(t);
    }
    return NextResponse.json({ message: `Subscribed to topic ${topic}` });
  } catch (error) {
    console.error("Error subscribing to topic:", error);
    return NextResponse.json(
      { error: "Error subscribing to topic" },
      { status: 500 }
    );
  }
}
