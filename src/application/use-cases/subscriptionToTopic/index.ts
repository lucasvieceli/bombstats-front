export async function subscriptionToTopic(token: string, topic: string) {
  await fetch("/api/subscribe-to-topic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, topic, subscribe: true }),
  });
}
