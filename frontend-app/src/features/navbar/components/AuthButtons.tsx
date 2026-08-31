"use client";
import { Button } from "@/components/ui/button";
// Modals are lifted to Navbar; handlers are received via props
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";
// legacy hooks removed: we use the central zustand store for navbar state
import { useCustomerAuthStore } from "@/stores/customerAuth.store";
import { useRouter } from "next/navigation";
import UserBadge from "@/src/features/auth/UserBadge";

type Props = {
  onOpenRegister?: () => void;
  onOpenSignIn?: () => void;
};

export default function AuthButtons({ onOpenRegister, onOpenSignIn }: Props) {
  const mounted = useClientI18n();
  const { t } = useTranslation();
  // Prefer the central zustand store so navbar reflects AuthForm actions
  // Use separate selectors to avoid returning a new object each render
  const customer = useCustomerAuthStore((s) => s.customer);
  const isAuthenticated = useCustomerAuthStore((s) => s.isAuthenticated);
  const logout = useCustomerAuthStore((s) => s.logout);

  const router = useRouter();

  function handleSignOut() {
    // call store logout and navigate to auth page
    try {
      logout();
    } finally {
      router.push("/auth");
    }
  }

  return (
    <div className="hidden md:flex items-center gap-3 font-[monospace]">
      {isAuthenticated && customer ? (
        <UserBadge name={customer.name} onSignOut={handleSignOut} />
      ) : (
        <>
          <Button
            variant="ghost"
            className="bg-transparent border-line text-ivory hover:bg-transparent hover:border-gold hover:text-gold"
            onClick={() => {
              if (onOpenSignIn) onOpenSignIn();
              else window.dispatchEvent(new CustomEvent("open-signin-modal"));
            }}
          >
            {mounted ? t("auth.signIn") : ""}
          </Button>
          <Button
            variant="default"
            className="hover:opacity-90 text-white bg-emerald border-none hover:bg-emerald font-bold"
            onClick={() => {
              if (onOpenRegister) onOpenRegister();
              else window.dispatchEvent(new CustomEvent("open-register-modal"));
            }}
          >
            {mounted ? t("auth.register") : ""}
          </Button>
        </>
      )}
    </div>
  );
}
