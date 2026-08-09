"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import useAuth from "@/src/features/auth/useAuth";
import { useTranslation } from "react-i18next";

type Props = { isOpen: boolean; onClose: () => void };

export default function RegisterModal({ isOpen, onClose }: Props) {
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    governorate: "",
    area: "",
  });
  const auth = useAuth();
  const { t } = useTranslation();

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      auth.register({
        fullName: form.fullName,
        email: form.email,
        governorate: form.governorate,
        area: form.area,
      });
      onClose();
    } catch (err) {
      // TODO: show UI error
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  function openSignIn() {
    onClose();
    const ev = new CustomEvent("open-signin-modal");
    window.dispatchEvent(ev);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("modal.createAccount")}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-neutral-300 mb-1 block">
            {t("modal.fullName")}
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder={t("modal.fullName")}
            className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300 mb-1 block">
            {t("modal.email")}
          </label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder={t("modal.email")}
            className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
            type="email"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-neutral-300 mb-1 block">
              {t("modal.governorate")}
            </label>
            <select
              name="governorate"
              value={form.governorate}
              onChange={onChange}
              className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
            >
              <option value="">{t("modal.select")}</option>
              <option value="hawalli">{t("modal.gov.hawalli")}</option>
              <option value="ahmadi">{t("modal.gov.ahmadi")}</option>
              <option value="mubarak-al-kabeer">{t("modal.gov.mubarak")}</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-neutral-300 mb-1 block">
              {t("modal.area")}
            </label>
            <input
              name="area"
              value={form.area}
              onChange={onChange}
              placeholder={t("modal.areaPlaceholder")}
              className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
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
