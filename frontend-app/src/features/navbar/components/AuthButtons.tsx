"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import useClientI18n from "@/src/i18n/useI18n";

export default function AuthButtons() {
  const mounted = useClientI18n();
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex items-center gap-3 font-[monospace]">
      <Button
        variant="outline"
        size="md"
        rounded="md"
        className="hover:border hover:border-title-yellow hover:text-title-yellow hover:bg-transparent"
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
      >
        {mounted ? t("auth.register") : ""}
      </Button>
    </div>
  );
}
