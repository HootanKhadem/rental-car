"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCustomerAuthStore } from "@/stores/customerAuth.store";
import { Loader2 } from "lucide-react";

export default function LandingAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useCustomerAuthStore();

  useEffect(() => {
    // اگر لودینگ تمام شد و کاربر لاگین نبود، به صفحه auth بفرست
    if (!isLoading && !isAuthenticated) {
      // ذخیره آدرس فعلی برای بازگشت بعد از لاگین
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/auth?callbackUrl=${callbackUrl}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-ink">
        <Loader2 className="h-8 w-8 animate-spin text-gold-bright" />
      </div>
    );
  }

  // اگر کاربر لاگین است، محتوای اصلی را نمایش بده
  return <>{children}</>;
}
