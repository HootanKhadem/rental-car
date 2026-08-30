"use client";

import { Modal } from "@/components/ui/custom/modal";
import { Button } from "@/components/ui/button";
import useAuth from "@/src/features/auth/useAuth";
import { useAuthContextMaybe } from "@/src/features/auth/AuthProvider";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "@/components/ui/custom/inputField/inputField";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: "emailRequired",
    })
    .email({
      message: "invalidEmail",
    }),
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
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: SignInForm) {
    try {
      await ctx.signIn(data.email);

      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      if (message.includes("User not found")) {
        setError("email", {
          type: "manual",
          message: "userNotFound",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "generic",
        });
      }
    }
  }

  function openRegister() {
    onClose();

    window.dispatchEvent(new CustomEvent("open-register-modal"));
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose} title={t("auth.signIn")}>
      <p className="-mt-4 text-xs text-neutral-400 mb-6">
        {t("modal.welcome")}
      </p>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <InputField
          label={t("modal.email")}
          description={t("modal.emailDescription")}
          placeholder={t("modal.emailPlaceholder")}
          type="email"
          autoComplete="email"
          inputMode="email"
          disabled={isSubmitting}
          error={
            errors.email?.message
              ? t(`modal.${errors.email.message}`)
              : undefined
          }
          {...register("email")}
        />

        <Button
          variant="solid"
          type="submit"
          disabled={isSubmitting}
          className="
            w-full
            bg-emerald
            border-emerald
            text-white
            hover:bg-emerald-deep
            hover:border-emerald-deep
            font-mono
            font-bold
          "
        >
          {isSubmitting ? t("modal.signingIn") : t("modal.signInButton")}
        </Button>

        <p className="text-center text-sm text-neutral-400">
          {t("modal.haveAccount")}{" "}
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={openRegister}
            className="
              cursor-pointer
              border-none
              bg-transparent
              p-0
              text-gold
              hover:bg-transparent
              hover:text-gold-deep
            "
          >
            {t("modal.registerLink")}
          </Button>
        </p>
      </form>
    </Modal>
  );
}
