"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm } from "@/src/components/auth/authForm";
import { useCustomerAuthStore } from "@/stores/customerAuth.store";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/custom/card/card";
import { Lock } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { isAuthenticated } = useCustomerAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(callbackUrl);
    }
  }, [isAuthenticated, router, callbackUrl]);

  const handleSuccess = () => {
    router.push(callbackUrl);
  };

  return (
    // ✅ اضافه کردن کلاس dark و min-h-screen برای پوشش کل صفحه
    <div className="dark min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      <Card className="w-full max-w-md relative z-10 border-border/50 shadow-2xl bg-card">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Welcome to CityDrive
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in or create an account to get started
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <AuthForm onSuccess={handleSuccess} />
        </CardContent>
      </Card>

      <div className="absolute bottom-4 text-center text-xs text-muted-foreground z-10">
        <p>© 2026 CityDrive. All rights reserved.</p>
      </div>
    </div>
  );
}
