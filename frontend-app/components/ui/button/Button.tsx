"use client";

import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";

export type ButtonProps = React.ComponentProps<typeof BaseButton> & {
  variant?: "outline" | "solid";
};

export function Button({
  variant = "solid",
  className,
  ...props
}: ButtonProps) {
  const variantClasses = {
    outline: `
      border
      border-[var(--color-title-yellow)]
      bg-transparent
      text-[var(--color-title-yellow)]
      hover:bg-[var(--color-title-yellow)]
      hover:text-black
    `,

    solid: `
      border
      border-[var(--color-button-primary-yellow)]
      bg-[var(--color-button-primary-yellow)]
      text-black
      hover:bg-[var(--color-title-yellow)]
      hover:border-[var(--color-title-yellow)]
    `,
  };

  return (
    <BaseButton
      {...props}
      className={[
        `
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-md
          px-5
          py-2.5
          text-sm
          font-medium
          cursor-pointer
          select-none
          transition-all
          duration-200
          ease-out
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-title-yellow
          focus-visible:ring-offset-2
          focus-visible:ring-offset-black

          disabled:pointer-events-none
          disabled:opacity-50
        `,
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default Button;
