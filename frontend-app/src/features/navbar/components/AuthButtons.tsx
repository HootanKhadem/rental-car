"use client";
import { Button } from "@/components/ui/button/button";
// Modals are lifted to Navbar; handlers are received via props
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";
import useAuth from "@/src/features/auth/useAuth";
import { useAuthContextMaybe } from "@/src/features/auth/AuthProvider";
import UserBadge from "@/src/features/auth/UserBadge";

type Props = {
  onOpenRegister?: () => void;
  onOpenSignIn?: () => void;
};

export default function AuthButtons({ onOpenRegister, onOpenSignIn }: Props) {
  const mounted = useClientI18n();
  const { t } = useTranslation();

  const auth = useAuth();
  // call hooks in stable order: get maybe-context and fallback to legacy hook
  const maybeCtx = useAuthContextMaybe();
  const ctx = maybeCtx ?? auth;

  return (
    <div className="hidden md:flex items-center gap-3 font-[monospace]">
      {ctx.isAuthenticated && ctx.user ? (
        <UserBadge name={ctx.user.fullName} onSignOut={() => ctx.signOut()} />
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
