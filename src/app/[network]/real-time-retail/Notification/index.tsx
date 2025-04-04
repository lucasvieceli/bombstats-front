"use client";
import { WalletNetwork } from "@/application/entities/wallet";
import { sendNotificationTest } from "@/application/use-cases/sendNotificationTest";
import { subscriptionToTopic } from "@/application/use-cases/subscriptionToTopic";
import { unSubscriptionToTopic } from "@/application/use-cases/unSubscriptionToTopic";
import Checkbox from "@/components/Checkbox";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { fireBaseApp } from "@/util/firebase";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface NotificationCheckBoxProps {
  network: WalletNetwork;
}
function NotificationCheckBox({ network }: NotificationCheckBoxProps) {
  const t = useTranslations("realTimeRetail.notifications");

  const localStorageKey = `notifications-retail-${network}`;
  const [isLoading, setIsLoading] = useState(false);
  const [subscripted, setSubscript] = useLocalStorage(localStorageKey, false);
  const [swRegistration, setSwRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setSwRegistration(registration);
      });
    }
  }, []);

  async function onClick() {
    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        if (!swRegistration) {
          alert(t("serviceWorkerNotRegistered"));
          return;
        }

        const messaging = getMessaging(fireBaseApp);
        const token = await getToken(messaging, {
          vapidKey:
            "BKTggnXB84sR-wKW0hgX7TbP1W4j1QMIFbQxYbcs24XtlXgcjnvbzKhoj-UQA4eC193I5-rudetu9JcqB6lYto0",
          serviceWorkerRegistration: swRegistration,
        });

        setIsLoading(true);
        if (subscripted) {
          unSubscriptionToTopic(token, localStorageKey);
          setSubscript(false);
        } else {
          subscriptionToTopic(token, localStorageKey);
          setSubscript(true);
          sendNotificationTest(token);

          alert(t("testNotificationAlert"));
        }
        setIsLoading(false);
      } else {
        alert(t("allowNotifications"));
      }
    } catch (e: any) {
      console.error(e);
      alert(e.message);
      setIsLoading(false);
      setSubscript(false);
    }
  }
  return (
    <Checkbox
      id="c-1"
      className="bg-secondary rounded-3xl overflow-hidden px-5 flex flex-row items-center h-14 gap-2.5 hover:bg-secondaryHover cursor-pointer"
      onClick={onClick}
      disabled={isLoading}
      checked={subscripted}
    >
      {t("notifications")}
    </Checkbox>
  );
}

export default NotificationCheckBox;
