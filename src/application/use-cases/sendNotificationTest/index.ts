export async function sendNotificationTest(token: string) {
  await fetch("/api/send-to-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
}
