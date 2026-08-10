"use client";
import React from "react";
import { createPortal } from "react-dom";

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
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const previousActive = React.useRef<HTMLElement | null>(null);

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

  // manage focus and keyboard interactions while modal is mounted
  React.useEffect(() => {
    if (!mounted) return;

    // save previously focused element to restore later
    previousActive.current = document.activeElement as HTMLElement | null;

    // focus the panel or first focusable element inside it
    const focusPanel = () => {
      try {
        if (!panelRef.current) return;
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length) focusable[0].focus();
        else panelRef.current.focus();
      } catch {
        // ignore
      }
    };

    // small delay so element is mounted and focusable
    const id = window.setTimeout(focusPanel, 50);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null);

        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      // restore focus
      try {
        if (previousActive.current) previousActive.current.focus();
      } catch {
        // ignore
      }
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        // overlay fades in/out
        className={
          "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 " +
          (visible ? "opacity-100" : "opacity-0")
        }
        onClick={onClose}
        data-testid="modal-overlay"
      />

      <div
        // modal panel scales/fades/translate
        ref={panelRef}
        tabIndex={-1}
        aria-labelledby={title ? "rc-modal-title" : undefined}
        className={
          "relative w-full max-w-148 mx-auto bg-[#16261F] border border-divider-line rounded-2xl p-6 shadow-xl text-white transform transition-all duration-200 max-h-[90vh] overflow-auto " +
          (visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95") +
          " " +
          className
        }
        style={{ willChange: "opacity, transform" }}
      >
        <div className="flex items-start justify-between mb-4">
          {title ? (
            <h3 id="rc-modal-title" className="text-2xl font-semibold">
              {title}
            </h3>
          ) : null}
          <button
            aria-label="close modal"
            onClick={onClose}
            className="p-1 rounded-md border border-neutral-700 hover:text-red-400 hover:border-red-400 cursor-pointer"
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

  // Render into document.body so `position: fixed` is relative to viewport
  // and not affected by transformed ancestors in the app layout.
  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
}
