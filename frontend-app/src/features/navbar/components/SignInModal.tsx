"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import useAuth from "@/src/features/auth/useAuth";

type Props = { isOpen: boolean; onClose: () => void };

export default function SignInModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = React.useState("");
  const auth = useAuth();

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
    <Modal isOpen={isOpen} onClose={onClose} title="Sign in">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <p className="text-neutral-400">Welcome back.</p>

        <div>
          <label className="text-sm text-neutral-300 mb-1 block">EMAIL</label>
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
            SIGN IN
          </Button>
        </div>

        <p className="text-center text-sm text-neutral-400">
          No account?{" "}
          <button
            type="button"
            onClick={openRegister}
            className="text-title-yellow"
          >
            Register
          </button>
        </p>
      </form>
    </Modal>
  );
}
