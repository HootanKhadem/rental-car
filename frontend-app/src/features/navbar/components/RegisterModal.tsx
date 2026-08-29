"use client";

import { Modal } from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button/button";
import InputField from "@/components/ui/inputField/inputField";
import SelectField from "@/components/ui/selectField/selectField";

import useAuth from "@/src/features/auth/useAuth";
import { useAuthContextMaybe } from "@/src/features/auth/AuthProvider";

import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const registerSchema = z.object({
  fullName: z.string().trim().min(1, {
    message: "required",
  }),

  email: z
    .string()
    .trim()
    .min(1, {
      message: "emailRequired",
    })
    .email({
      message: "invalidEmail",
    }),

  governorate: z.string().min(1, {
    message: "required",
  }),

  area: z.string().trim().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const authFallback = useAuth();
  const ctx = useAuthContextMaybe() ?? authFallback;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      fullName: "",
      email: "",
      governorate: "",
      area: "",
    },

    mode: "onSubmit",
  });

  async function onSubmit(data: RegisterForm) {
    try {
      await ctx.register({
        fullName: data.fullName,
        email: data.email,
        governorate: data.governorate,
        area: data.area,
      });

      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      if (message.includes("User already exists")) {
        setError("email", {
          type: "manual",
          message: "userExists",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "generic",
        });
      }
    }
  }

  function openSignIn() {
    onClose();

    window.dispatchEvent(new CustomEvent("open-signin-modal"));
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title={t("modal.createAccount")}
    >
      <p className="-mt-4 mb-6 text-xs text-neutral-400">
        {t("modal.createAccountDescription")}
      </p>

      {/* Privacy Notice */}
      <div
        className="
          mx-auto
          my-7
          flex
          max-w-md
          items-center
          justify-center
          gap-2
          rounded-lg
          border
          border-emerald-deep
          p-2
          text-xs
          text-sand
        "
        style={{background:"rgba(47,163,122,.08)"}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_4418_9535)">
            <path
              d="M10.49 2.23055L5.50003 4.11055C4.35003 4.54055 3.41003 5.90055 3.41003 7.12055V14.5505C3.41003 15.7305 4.19003 17.2805 5.14003 17.9905L9.44003 21.2005C10.85 22.2605 13.17 22.2605 14.58 21.2005L18.88 17.9905C19.83 17.2805 20.61 15.7305 20.61 14.5505V7.12055C20.61 5.89055 19.67 4.53055 18.52 4.10055L13.53 2.23055C12.68 1.92055 11.32 1.92055 10.49 2.23055Z"
              stroke="var(--color-emerald)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_4418_9535">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <p>{t("privacyNote")}</p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Full Name */}
        <InputField
          label={t("modal.fullName")}
          placeholder={t("modal.fullnamePlaceholder")}
          autoComplete="name"
          description={t("modal.fullnameDescription")}
          type="text"
          inputMode="text"
          disabled={isSubmitting}
          error={
            errors.fullName?.message
              ? t(`modal.error.${errors.fullName.message}`)
              : undefined
          }
          {...register("fullName")}
        />

        {/* Email */}
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

        {/* Governorate + Area */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Governorate */}
          <Controller
            name="governorate"
            control={control}
            render={({ field, fieldState }) => (
              <SelectField
                label={t("modal.governorate")}
                placeholder={t("modal.select")}
                required
                options={[
                  {
                    label: t("modal.gov.hawalli"),
                    value: t("modal.gov.hawalli"),
                  },
                  {
                    label: t("modal.gov.ahmadi"),
                    value: t("modal.gov.ahmadi"),
                  },
                  {
                    label: t("modal.gov.mubarak"),
                    value: t("modal.gov.mubarak"),
                  },
                ]}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                disabled={isSubmitting}
                description={t("modal.governorateDescription")}
                error={
                  fieldState.error?.message
                    ? t(`modal.error.${fieldState.error.message}`)
                    : undefined
                }
              />
            )}
          />

          {/* Area */}
          <InputField
            label={t("modal.area")}
            placeholder={t("modal.areaPlaceholder")}
            description={t("modal.areaDescription")}
            type="text"
            inputMode="text"
            disabled={isSubmitting}
            error={
              errors.area?.message
                ? t(`modal.error.${errors.area.message}`)
                : undefined
            }
            {...register("area")}
          />
        </div>

        {/* Submit */}
        <Button
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
          {isSubmitting ? t("modal.creatingAccount") : t("modal.createButton")}
        </Button>

        {/* Sign In */}
        <p className="text-center text-sm text-neutral-400">
          {t("modal.haveAccount")}{" "}
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={openSignIn}
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
            {t("modal.signInLink")}
          </Button>
        </p>
      </form>
    </Modal>
  );
}
