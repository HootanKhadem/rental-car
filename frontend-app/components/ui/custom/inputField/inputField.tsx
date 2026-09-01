"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

type RootState = {
  disabled: boolean;
  invalid: boolean;
};

type LabelState = RootState;
type InputState = RootState;
type DescriptionState = RootState;
type ErrorState = RootState;

type RootClassName = string | ((state: RootState) => string);
type LabelClassName = string | ((state: LabelState) => string);
type InputClassName = string | ((state: InputState) => string);
type DescriptionClassName = string | ((state: DescriptionState) => string);
type ErrorClassName = string | ((state: ErrorState) => string);

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
type ControlProps = React.ComponentPropsWithoutRef<typeof Input>;
type DescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
type ErrorProps = React.HTMLAttributes<HTMLParagraphElement>;

export type InputFieldProps = Omit<ControlProps, "className"> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;

  labelProps?: Omit<LabelProps, "children" | "className">;

  descriptionProps?: Omit<DescriptionProps, "children" | "className">;

  errorProps?: Omit<ErrorProps, "children" | "className">;

  rootClassName?: RootClassName;
  labelClassName?: LabelClassName;
  inputClassName?: InputClassName;
  descriptionClassName?: DescriptionClassName;
  errorClassName?: ErrorClassName;
};

export function InputField({
  label,
  description,
  error,

  labelProps,
  descriptionProps,
  errorProps,

  rootClassName,
  labelClassName,
  inputClassName,
  descriptionClassName,
  errorClassName,

  ...inputProps
}: InputFieldProps) {
  const hasError = Boolean(error);
  const disabled = Boolean(inputProps.disabled);
  const state: RootState = {
    disabled,
    invalid: hasError,
  };

  const inputId = typeof inputProps.id === "string" ? inputProps.id : undefined;

  const descriptionId = inputId ? `${inputId}-description` : undefined;

  const errorId = inputId ? `${inputId}-error` : undefined;

  const describedBy = hasError ? errorId : descriptionId;

  const { i18n } = useTranslation();

  return (
    <div
      data-invalid={hasError || undefined}
      className={twMerge(
        "flex w-full flex-col gap-1",
        typeof rootClassName === "function"
          ? rootClassName(state)
          : rootClassName,
      )}
    >
      {label ? (
        <label
          {...labelProps}
          htmlFor={inputId}
          className={twMerge(
            `
              transition-colors
              duration-200
              select-none
              text-xs
              font-medium
              text-smoke
              font-mono
              tracking-wide
            `,
            hasError ? "text-rust" : "text-smoke",
            typeof labelClassName === "function"
              ? labelClassName(state)
              : labelClassName,
          )}
        >
          {label}
        </label>
      ) : null}

      <Input
        {...inputProps}
        id={inputId}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className={twMerge(
          `
            w-full
            rounded-lg
            border
            border-line
            bg-ink
            h-10
            text-sm
            text-ivory
            placeholder:text-smoke-dim
            outline-none

            transition-all
            duration-200
            ease-out

            hover:border-gold-deep

            focus:border-gold-bright
            focus:ring-2
            focus:ring-gold/20

            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:hover:border-line

            aria-invalid:border-rust
            aria-invalid:hover:border-rust
            aria-invalid:focus:border-rust
            aria-invalid:focus:ring-rust/20
          `,
          typeof inputClassName === "function"
            ? inputClassName(state)
            : inputClassName,
        )}
      />

      {hasError ? (
        <p
          {...errorProps}
          id={errorId}
          className={twMerge(
            "text-xs text-rust font-mono",
            typeof errorClassName === "function"
              ? errorClassName(state)
              : errorClassName,
          )}
        >
          {error}
        </p>
      ) : description ? (
        <p
          {...descriptionProps}
          id={descriptionId}
          className={(() => {
            const lang = i18n?.language?.toLowerCase();

            const languageMargin =
              lang?.startsWith("ar") || lang?.startsWith("en") ? "ms-1" : "";

            return twMerge(
              "select-none text-xs font-medium text-smoke font-mono",
              languageMargin,
              typeof descriptionClassName === "function"
                ? descriptionClassName(state)
                : descriptionClassName,
            );
          })()}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default InputField;
