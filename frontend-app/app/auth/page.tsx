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
    <div className="bg-ink min-h-screen flex items-center justify-center dark p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      {/* <Card className="w-full max-w-md relative z-10 ring-3 ring-line/50 rounded-2xl mb-5 bg-gradient-to-br from-ink to-graphite shadow-[0_8px_30px_rgba(0,0,0,0.8),_0_-2px_15px_rgba(34,197,94,0.15)]"> */}
      <Card className="w-full max-w-md relative z-10 ring-3 ring-line/50 rounded-2xl mb-10 bg-gradient-to-br from-ink to-graphite shadow-[0_10px_40px_rgba(0,0,0,0.9),0_-3px_20px_rgba(34,197,94,0.12)] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none">
        <CardHeader className="space-y-3 text-center">
          {/* <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-950 border-2 border-emerald-300 flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-emerald-300" />
          </div> */}
          <div className="mx-auto w-14 h-14 flex items-center justify-center">
            <p className="w-14 h-14 rounded-xl bg-gradient-to-br pt-0.5 from-emerald to-gold flex items-center justify-center font-bold font-serif text-ink text-4xl">
              C
            </p>
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

      <div className="absolute bottom-2 text-center text-xs text-muted-foreground z-10">
        <p>© 2026 CityDrive. All rights reserved.</p>
      </div>
    </div>
  );
}
