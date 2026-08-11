"use client";
import { Modal } from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button/button";
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
    <Modal open={isOpen} onOpenChange={onClose} title={t("auth.signIn")}>
      <p className="text-neutral-400 text-sm  -mt-3">{t("modal.welcome")}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="mt-7">
          <label
            htmlFor="si-email"
            className="text-xs text-neutral-400 mb-2 block"
          >
            {t("modal.email")}
          </label>
          <input
            id="si-email"
            type="email"
            className="w-full bg-[#0B1512] border border-background-icon-card rounded-lg text-sm p-3"
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
            variant="solid"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald border-emerald text-white hover:bg-emerald-deep hover:border-emerald-deep font-mono font-bold"
          >
            {t("modal.signInButton")}
          </Button>
        </div>

        <p className="text-center text-sm text-neutral-400">
          {t("modal.haveAccount")}{" "}
          <Button
            type="button"
            onClick={openRegister}
            className="text-gold cursor-pointer hover:text-gold-deep p-0 bg-transparent border-none hover:bg-transparent"
          >
            {t("modal.registerLink")}
          </Button>
        </p>
      </form>
    </Modal>
  );
}
