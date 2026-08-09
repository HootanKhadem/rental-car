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
    <Modal isOpen={isOpen} onClose={onClose} title={t("modal.createAccount")}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="rc-fullname"
            className="text-sm text-neutral-300 mb-1 block"
          >
            {t("modal.fullName")}
          </label>
          <input
            id="rc-fullname"
            className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
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
            className="text-sm text-neutral-300 mb-1 block"
          >
            {t("modal.email")}
          </label>
          <input
            id="rc-email"
            type="email"
            className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
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
              className="text-sm text-neutral-300 mb-1 block"
            >
              {t("modal.governorate")}
            </label>
            <select
              id="rc-gov"
              className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
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
            <label className="text-sm text-neutral-300 mb-1 block">
              {t("modal.area")}
            </label>
            <input
              id="rc-area"
              className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
              placeholder={t("modal.areaPlaceholder")}
              {...register("area")}
            />
          </div>
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
            {t("modal.createButton")}
          </Button>
        </div>

        <p className="text-center text-sm text-neutral-400">
          {t("modal.haveAccount")}{" "}
          <button
            type="button"
            onClick={openSignIn}
            className="text-title-yellow"
          >
            {t("modal.signInLink")}
          </button>
        </p>
      </form>
    </Modal>
  );
}
