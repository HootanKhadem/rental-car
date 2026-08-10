export type NotificationItem = {
  id: string;
  title: string;
  subtitle?: string;
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

export function addNotification(title: string, subtitle?: string) {
  const items = readNotifications();
  const it: NotificationItem = {
    id: String(Date.now()),
    title,
    subtitle,
    read: false,
    ts: Date.now(),
  };
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
