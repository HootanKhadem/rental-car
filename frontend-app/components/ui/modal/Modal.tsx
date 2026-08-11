"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";

export type ModalProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  title?: React.ReactNode;
  children?: React.ReactNode;

  className?: string;
  overlayClassName?: string;
  titleClassName?: string;
  closeButtonClassName?: string;

  showCloseButton?: boolean;
};

export function Modal({
  open,
  defaultOpen,
  onOpenChange,

  title,
  children,

  className = "",
  overlayClassName = "",
  titleClassName = "",
  closeButtonClassName = "",

  showCloseButton = true,
}: ModalProps) {
  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Backdrop
          className={`
            fixed
            inset-0
            z-50

            bg-black/50
            backdrop-blur-sm

            transition-opacity
            duration-200

            data-[starting-style]:opacity-0
            data-[ending-style]:opacity-0

            ${overlayClassName}
          `}
        />

        {/* Modal */}
        <Dialog.Popup
          className={`
            fixed
            left-1/2
            top-1/2
            z-50

            w-[calc(100%-2rem)]
            max-w-lg

            -translate-x-1/2
            -translate-y-1/2

            overflow-hidden

            rounded-2xl

            border
            border-gray-500

            bg-emerald-700

            p-6

            text-white

            shadow-2xl

            outline-none

            transition-all
            duration-200
            ease-out

            data-[starting-style]:scale-95
            data-[starting-style]:opacity-0

            data-[ending-style]:scale-95
            data-[ending-style]:opacity-0

            ${className}
          `}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="mb-5 flex items-start justify-between gap-4">
              {/* Title */}
              {title ? (
                <Dialog.Title
                  className={`
                    text-xl
                    font-semibold
                    leading-tight

                    ${titleClassName}
                  `}
                >
                  {title}
                </Dialog.Title>
              ) : (
                <div />
              )}

              {/* Close Button */}
              {showCloseButton && (
                <Dialog.Close
                  aria-label="Close modal"
                  className={`
                    shrink-0
                    cursor-pointer

                    rounded-md
                    p-1

                    text-gray-400

                    transition-colors
                    duration-150

                    hover:text-red-500

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-red-500

                    ${closeButtonClassName}
                  `}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M6 6L18 18" strokeLinecap="round" />

                    <path d="M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </Dialog.Close>
              )}
            </div>
          )}

          {/* Content */}
          <div>{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
