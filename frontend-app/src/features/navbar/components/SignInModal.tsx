"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import useAuth from "@/src/features/auth/useAuth";
import { useAuthContextMaybe } from "@/src/features/auth/AuthProvider";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type Props = { isOpen: boolean; onClose: () => void };

const signInSchema = z.object({
  email: z.string().email({ message: "invalidEmail" }),
});
type SignInForm = z.infer<typeof signInSchema>;

export default function SignInModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const authFallback = useAuth();
  const ctx = useAuthContextMaybe() ?? authFallback;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: SignInForm) {
    try {
      ctx.signIn(data.email);
      onClose();
      //eslint-disable-next-line
    } catch (err: any) {
      const msg = String(err?.message || err);
      if (msg.includes("User not found")) {
        setError("email", {
          type: "manual",
          message: t("modal.error.userNotFound"),
        });
      } else {
        setError("email", {
          type: "manual",
          message: t("modal.error.generic"),
        });
      }
    }
  }

  function openRegister() {
    onClose();
    const ev = new CustomEvent("open-register-modal");
    window.dispatchEvent(ev);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("auth.signIn")}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <p className="text-neutral-400">{t("modal.welcome")}</p>

        <div>
          <label
            htmlFor="si-email"
            className="text-sm text-neutral-300 mb-1 block"
          >
            {t("modal.email")}
          </label>
          <input
            id="si-email"
            type="email"
            className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
            placeholder={t("modal.emailPlaceholder")}
            {...register("email")}
          />
          {errors.email ? (
            <div className="text-sm text-red-400 mt-1">
              {String(errors.email.message)}
            </div>
          ) : null}
        </div>

        <div>
          <Button
            type="submit"
            fullWidth
            rounded="md"
            bgClass="bg-gradient-to-r from-emerald-500 to-emerald-400"
            textClass="text-white"
            disabled={isSubmitting}
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
