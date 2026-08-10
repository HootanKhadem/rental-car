"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  readNotifications,
  writeNotifications,
  acknowledgeNotification,
  NotificationItem,
} from "../../notifications/notifications";

function migrateLegacyPure(itemsIn: NotificationItem[]) {
  let changed = false;
  const migrated = itemsIn.map((it) => {
    let out = it;
    if (!it.titleKey && it.title) {
      const enTitle = "Reservation confirmed!";
      const arTitle = "تم تأكيد الحجز!";
      if (it.title === enTitle || it.title === arTitle) {
        out = { ...out, titleKey: "reserve:doneMsgTitle" };
        changed = true;
      }
    }
    if (!it.subtitleKey && it.subtitle) {
      // English pattern: "<car> is on its way"
      const enMatch = it.subtitle.match(/^(.*) is on its way/i);
      if (enMatch) {
        const car = enMatch[1].trim();
        out = {
          ...out,
          subtitleKey: "reserve:doneMsgBodyWithCar",
          subtitleParams: { car },
        };
        changed = true;
      } else {
        // Arabic pattern: "<car> في الطريق"
        const arMatch = it.subtitle.match(/^(.*)\sفي\sالطريق/);
        if (arMatch) {
          const car = arMatch[1].trim();
          out = {
            ...out,
            subtitleKey: "reserve:doneMsgBodyWithCar",
            subtitleParams: { car },
          };
          changed = true;
        }
      }
    }
    return out;
  });
  return { migrated, changed } as const;
}

export default function NotificationsPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [items, setItems] = React.useState<NotificationItem[]>(() => {
    const { migrated } = migrateLegacyPure(readNotifications());
    return migrated;
  });

  React.useEffect(() => {
    function onChange() {
      const { migrated, changed } = migrateLegacyPure(readNotifications());
      if (changed) writeNotifications(migrated);
      setItems(migrated);
    }

    // initial migration write if needed (state already initialized with migrated items)
    const initial = migrateLegacyPure(readNotifications());
    if (initial.changed) writeNotifications(initial.migrated);

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
          items.map((it) => {
            const titleText = it.titleKey
              ? //eslint-disable-next-line
                String(t(it.titleKey, it.titleParams as any))
              : String(it.title ?? "");
            const subtitleText = it.subtitleKey
              ? //eslint-disable-next-line
                String(t(it.subtitleKey, it.subtitleParams as any))
              : String(it.subtitle ?? "");
            return (
              <div key={it.id} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-emerald-700 flex items-center justify-center text-white">
                  🔔
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{titleText}</div>
                  {subtitleText ? (
                    <div className="text-sm text-neutral-400">
                      {subtitleText}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="px-3 py-2 border-t border-divider-line text-center">
        <button
          onClick={onClose}
          className="text-sm text-red-400 cursor-pointer hover:text-red-500"
        >
          {t("notifications.close")}
        </button>
      </div>
    </div>
  );
}
