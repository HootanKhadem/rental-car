export type NotificationItem = {
  id: string;
  // legacy: resolved strings
  title?: string;
  subtitle?: string;
  // i18n keys (preferred)
  titleKey?: string;
  subtitleKey?: string;
  titleParams?: Record<string, string>;
  subtitleParams?: Record<string, string>;
  read?: boolean;
  ts?: number;
};

const KEY = "rc-notifications";

export function readNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as NotificationItem[];
  } catch {
    return [];
  }
}

export function writeNotifications(items: NotificationItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  // notify same-tab listeners
  window.dispatchEvent(new Event("rc-notifications-change"));
}

//eslint-disable-next-line
export function addNotification(titleOrPayload: any, subtitle?: string) {
  const items = readNotifications();
  const it: NotificationItem = {
    id: String(Date.now()),
    read: false,
    ts: Date.now(),
  };

  // backward-compatible string call: addNotification(title, subtitle)
  if (typeof titleOrPayload === "string") {
    it.title = titleOrPayload;
    if (typeof subtitle === "string") it.subtitle = subtitle;
  } else if (typeof titleOrPayload === "object" && titleOrPayload !== null) {
    const p = titleOrPayload as {
      title?: string;
      subtitle?: string;
      titleKey?: string;
      subtitleKey?: string;
      titleParams?: Record<string, string>;
      subtitleParams?: Record<string, string>;
    };
    if (p.title) it.title = p.title;
    if (p.subtitle) it.subtitle = p.subtitle;
    if (p.titleKey) it.titleKey = p.titleKey;
    if (p.subtitleKey) it.subtitleKey = p.subtitleKey;
    if (p.titleParams) it.titleParams = p.titleParams;
    if (p.subtitleParams) it.subtitleParams = p.subtitleParams;
  }

  const next = [it, ...items].slice(0, 50);
  writeNotifications(next);
  return it;
}

export function acknowledgeNotification(id: string) {
  const items = readNotifications();
  const next = items.map((it) => (it.id === id ? { ...it, read: true } : it));
  writeNotifications(next);
}

export function clearNotifications() {
  writeNotifications([]);
}
