"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import useAuth from "@/src/features/auth/useAuth";
import { useTranslation } from "react-i18next";

type Props = { isOpen: boolean; onClose: () => void };

export default function SignInModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = React.useState("");
  const auth = useAuth();
  const { t } = useTranslation();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      auth.signIn(email);
      onClose();
    } catch (err) {
      // TODO: show UI error
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  function openRegister() {
    onClose();
    const ev = new CustomEvent("open-register-modal");
    window.dispatchEvent(ev);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("modal.signIn")}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <p className="text-neutral-400">{t("modal.welcome")}</p>

        <div>
          <label className="text-sm text-neutral-300 mb-1 block">
            {t("modal.email")}
          </label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@email.com"
            className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
            type="email"
          />
        </div>

        <div>
          <Button
            type="submit"
            fullWidth
            rounded="md"
            bgClass="bg-gradient-to-r from-emerald-500 to-emerald-400"
            textClass="text-white"
          >
            {t("modal.signInButton")}
          </Button>
        </div>

        <p className="text-center text-sm text-neutral-400">
          {t("modal.noAccount")}{" "}
          <button
            type="button"
            onClick={openRegister}
            className="text-title-yellow"
          >
            {t("modal.registerLink")}
          </button>
        </p>
      </form>
    </Modal>
  );
}
