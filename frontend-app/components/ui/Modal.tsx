"use client";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: ModalProps) {
  const ANIM_MS = 200;
  const [mounted, setMounted] = React.useState<boolean>(isOpen);
  const [visible, setVisible] = React.useState<boolean>(false);

  // control body scroll lock when modal is mounted
  React.useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [mounted]);

  // mount/unmount with animation (avoid synchronous setState inside effect)
  React.useEffect(() => {
    let mountTimer: number | undefined;
    let visTimer: number | undefined;
    let unmountTimer: number | undefined;

    if (isOpen) {
      // schedule mounting asynchronously to avoid synchronous state update in effect
      mountTimer = window.setTimeout(() => {
        setMounted(true);
        visTimer = window.setTimeout(() => setVisible(true), 12);
      }, 0);
    } else {
      // trigger exit animation (schedule asynchronously to avoid sync setState in effect)
      visTimer = window.setTimeout(() => setVisible(false), 0);
      // unmount after animation
      unmountTimer = window.setTimeout(() => setMounted(false), ANIM_MS + 20);
    }

    return () => {
      if (mountTimer) window.clearTimeout(mountTimer);
      if (visTimer) window.clearTimeout(visTimer);
      if (unmountTimer) window.clearTimeout(unmountTimer);
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        // overlay fades in/out
        className={
          "absolute inset-0 bg-black/70 transition-opacity duration-200 " +
          (visible ? "opacity-100" : "opacity-0")
        }
        onClick={onClose}
        data-testid="modal-overlay"
      />

      <div
        // modal panel scales/fades/translate
        className={
          "relative w-full max-w-lg mx-auto bg-background-main border border-divider-line rounded-lg p-6 shadow-xl text-white transform transition-all duration-200 " +
          (visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95") +
          " " +
          className
        }
        style={{ willChange: "opacity, transform" }}
      >
        <div className="flex items-start justify-between mb-4">
          {title ? <h3 className="text-2xl font-semibold">{title}</h3> : null}
          <button
            aria-label="close modal"
            onClick={onClose}
            className="p-2 rounded-md border border-neutral-700"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
