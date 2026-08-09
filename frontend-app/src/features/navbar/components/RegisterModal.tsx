"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import useAuth from "@/src/features/auth/useAuth";

type Props = { isOpen: boolean; onClose: () => void };

export default function RegisterModal({ isOpen, onClose }: Props) {
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    governorate: "",
    area: "",
  });
  const auth = useAuth();

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
    <Modal isOpen={isOpen} onClose={onClose} title="Create account">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-neutral-300 mb-1 block">
            FULL NAME
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder="Abdullah Al-Ahmad"
            className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300 mb-1 block">EMAIL</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="name@email.com"
            className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
            type="email"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-neutral-300 mb-1 block">
              GOVERNORATE
            </label>
            <select
              name="governorate"
              value={form.governorate}
              onChange={onChange}
              className="w-full bg-[#0f2018] border border-neutral-800 rounded-md px-3 py-2"
            >
              <option value="">Select...</option>
              <option value="hawalli">Hawalli</option>
              <option value="ahmadi">Ahmadi</option>
              <option value="mubarak-al-kabeer">Mubarak Al-Kabeer</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-neutral-300 mb-1 block">
              AREA / ADDRESS
            </label>
            <input
              name="area"
              value={form.area}
              onChange={onChange}
              placeholder="Salmiya, street..."
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
            CREATE ACCOUNT
          </Button>
        </div>

        <p className="text-center text-sm text-neutral-400">
          Have an account?{" "}
          <button
            type="button"
            onClick={openSignIn}
            className="text-title-yellow"
          >
            Sign in
          </button>
        </p>
      </form>
    </Modal>
  );
}
