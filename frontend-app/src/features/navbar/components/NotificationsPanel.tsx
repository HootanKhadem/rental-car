"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  readNotifications,
  acknowledgeNotification,
  NotificationItem,
} from "../../notifications/notifications";

export default function NotificationsPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [items, setItems] = React.useState<NotificationItem[]>(() =>
    readNotifications(),
  );

  React.useEffect(() => {
    function onChange() {
      setItems(readNotifications());
    }
    window.addEventListener("rc-notifications-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("rc-notifications-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  function handleAck(id: string) {
    acknowledgeNotification(id);
    setItems(readNotifications());
  }

  return (
    <div className="w-80 bg-background-main border border-divider-line rounded-lg shadow-lg text-white overflow-hidden">
      <div className="px-4 py-3 border-b border-divider-line">
        <h4 className="text-lg font-semibold">{t("notifications.title")}</h4>
      </div>

      <div className="p-3 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-neutral-400">
            {t("notifications.empty", "No notifications")}
          </div>
        ) : (
          items.map((it) => (
            <div key={it.id} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-md bg-emerald-700 flex items-center justify-center text-white">
                🔔
              </div>
              <div className="flex-1">
                <div className="font-semibold">{it.title}</div>
                {it.subtitle ? (
                  <div className="text-sm text-neutral-400">{it.subtitle}</div>
                ) : null}
                {/* <div className="mt-2">
                  <button
                    onClick={() => handleAck(it.id)}
                    className="text-xs text-neutral-300 hover:text-white"
                  >
                    OK
                  </button>
                </div> */}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-3 py-2 border-t border-divider-line text-center">
        <button
          onClick={onClose}
          className="text-sm text-neutral-300 hover:text-white"
        >
          {t("notifications.close")}
        </button>
      </div>
    </div>
  );
}
