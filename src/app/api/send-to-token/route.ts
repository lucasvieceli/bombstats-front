import { NextResponse } from "next/server";
import admin from "firebase-admin";
var serviceAccount = require("@/../firebase.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(req: any) {
  const { token } = await req.json();

  try {
    await admin.messaging().send({
      token,
      data: {
        title: "Test Notification",
        body: "This is a test notification",
      },
    });
    return NextResponse.json({ message: `send` });
  } catch (error) {
    console.error("Error subscribing to topic:", error);
    return NextResponse.json(
      { error: "Error subscribing to topic" },
      { status: 500 }
    );
  }
}
