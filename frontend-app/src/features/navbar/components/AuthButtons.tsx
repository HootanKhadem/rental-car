"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import RegisterModal from "./RegisterModal";
import SignInModal from "./SignInModal";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";
import useAuth from "@/src/features/auth/useAuth";
import UserBadge from "@/src/features/auth/UserBadge";

export default function AuthButtons() {
  const mounted = useClientI18n();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const auth = useAuth();

  return (
    <div className="hidden md:flex items-center gap-3 font-[monospace]">
      {auth.isAuthenticated && auth.user ? (
        <UserBadge name={auth.user.fullName} onSignOut={() => auth.signOut()} />
      ) : (
        <>
          <Button
            variant="outline"
            size="md"
            rounded="md"
            className="hover:border hover:border-title-yellow hover:text-title-yellow hover:bg-transparent"
            onClick={() => setSignInOpen(true)}
          >
            {mounted ? t("auth.signIn") : ""}
          </Button>
          <Button
            variant="solid"
            size="md"
            rounded="md"
            bgClass="bg-button-primary-green"
            textClass="text-white"
            className="hover:opacity-95"
            onClick={() => setOpen(true)}
          >
            {mounted ? t("auth.register") : ""}
          </Button>
        </>
      )}
      <RegisterModal isOpen={open} onClose={() => setOpen(false)} />
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </div>
  );
}
