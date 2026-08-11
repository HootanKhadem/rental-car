"use client";
import Modal from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button/button";
import useAuth from "@/src/features/auth/useAuth";
import { useAuthContextMaybe } from "@/src/features/auth/AuthProvider";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type Props = { isOpen: boolean; onClose: () => void };

const registerSchema = z.object({
  fullName: z.string().min(1, { message: "required" }),
  email: z.string().email({ message: "invalidEmail" }),
  governorate: z.string().optional(),
  area: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const authFallback = useAuth();
  const ctx = useAuthContextMaybe() ?? authFallback;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", governorate: "", area: "" },
  });

  async function onSubmit(data: RegisterForm) {
    try {
      ctx.register({
        fullName: data.fullName,
        email: data.email,
        governorate: data.governorate,
        area: data.area,
      });
      onClose();
      //eslint-disable-next-line
    } catch (err: any) {
      // map known errors
      const msg = String(err?.message || err);
      if (msg.includes("User already exists")) {
        setError("email", {
          type: "manual",
          message: t("modal.error.userExists"),
        });
      } else {
        // generic
        setError("email", {
          type: "manual",
          message: t("modal.error.generic"),
        });
      }
    }
  }

  function openSignIn() {
    onClose();
    const ev = new CustomEvent("open-signin-modal");
    window.dispatchEvent(ev);
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title={t("modal.createAccount")}
    >
      <p className="text-sm text-zinc-400 -mt-3">
        Join City Drive in one step.
      </p>
      <div className="bg-emerald-950/30 max-w-lg mx-auto px-2 py-3 my-7 rounded-lg border border-emerald-700 text-stone-300 text-sm flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="darkgreen"
        >
          <g clipPath="url(#clip0_4418_7076)">
            <path
              d="M11.9999 22.7595C10.9099 22.7595 9.8299 22.4395 8.9799 21.8095L4.6799 18.5995C3.5399 17.7495 2.6499 15.9695 2.6499 14.5595V7.11945C2.6499 5.57945 3.7799 3.93945 5.2299 3.39945L10.2199 1.52945C11.2099 1.15945 12.7699 1.15945 13.7599 1.52945L18.7499 3.39945C20.1999 3.93945 21.3299 5.57945 21.3299 7.11945V14.5495C21.3299 15.9695 20.4399 17.7395 19.2999 18.5895L14.9999 21.7995C14.1699 22.4395 13.0899 22.7595 11.9999 22.7595ZM10.7499 2.93945L5.7599 4.80945C4.9099 5.12945 4.1599 6.20945 4.1599 7.12945V14.5595C4.1599 15.5095 4.8299 16.8395 5.5799 17.3995L9.8799 20.6095C11.0299 21.4695 12.9699 21.4695 14.1299 20.6095L18.4299 17.3995C19.1899 16.8295 19.8499 15.5095 19.8499 14.5595V7.11945C19.8499 6.20945 19.0999 5.12945 18.2499 4.79945L13.2599 2.92945C12.5799 2.68945 11.4199 2.68945 10.7499 2.93945Z"
              fill="white"
              style={{ fill: "var(--fillg)" }}
            />
          </g>
          <defs>
            <clipPath id="clip0_4418_7076">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p>{t("privacyNote")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="rc-fullname"
            className="text-xs text-neutral-400 mb-2 block"
          >
            {t("modal.fullName")}
          </label>
          <input
            id="rc-fullname"
            className="w-full bg-[#0B1512] border border-background-icon-card rounded-lg text-sm p-3"
            placeholder={t("modal.fullName")}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <div className="text-sm text-red-400 mt-1">
              {t(`modal.error.${errors.fullName.message}`)}
            </div>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="rc-email"
            className="text-xs text-neutral-400 mb-2 block"
          >
            {t("modal.email")}
          </label>
          <input
            id="rc-email"
            type="email"
            className="w-full bg-[#0B1512] border border-background-icon-card rounded-lg text-sm p-3"
            placeholder={t("modal.email")}
            {...register("email")}
          />
          {errors.email ? (
            <div className="text-sm text-red-400 mt-1">
              {String(errors.email.message)}
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="rc-gov"
              className="text-xs text-neutral-400 mb-2 block"
            >
              {t("modal.governorate")}
            </label>
            <select
              id="rc-gov"
              className="w-full bg-[#0B1512] border border-background-icon-card rounded-lg text-sm p-3"
              {...register("governorate")}
            >
              <option value="">{t("modal.select")}</option>
              <option value="hawalli">{t("modal.gov.hawalli")}</option>
              <option value="ahmadi">{t("modal.gov.ahmadi")}</option>
              <option value="mubarak-al-kabeer">
                {t("modal.gov.mubarak")}
              </option>
            </select>
          </div>

          <div>
            <label className="text-xs text-neutral-400 mb-2 block">
              {t("modal.area")}
            </label>
            <input
              id="rc-area"
              className="w-full bg-[#0B1512] border border-background-icon-card rounded-lg text-sm p-3"
              placeholder={t("modal.areaPlaceholder")}
              {...register("area")}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald border-emerald text-white hover:bg-emerald-deep hover:border-emerald-deep font-mono font-bold"
          >
            {t("modal.createButton")}
          </Button>
        </div>

        <p className="text-center text-sm text-neutral-400">
          {t("modal.haveAccount")}{" "}
          <button
            type="button"
            onClick={openSignIn}
            className="text-gold cursor-pointer hover:text-gold-deep p-0 bg-transparent border-none hover:bg-transparent"
          >
            {t("modal.signInLink")}
          </button>
        </p>
      </form>
    </Modal>
  );
}
