"use client";

import * as React from "react";
import { Field } from "@base-ui/react/field";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";

type RootProps = React.ComponentProps<typeof Field.Root>;
type LabelProps = React.ComponentProps<typeof Field.Label>;
type ControlProps = React.ComponentProps<typeof Field.Control>;
type DescriptionProps = React.ComponentProps<typeof Field.Description>;
type ErrorProps = React.ComponentProps<typeof Field.Error>;

export type InputFieldProps = Omit<RootProps, "children"> &
  Omit<ControlProps, "className"> & {
    label?: React.ReactNode;
    description?: React.ReactNode;
    error?: React.ReactNode;

    labelProps?: Omit<LabelProps, "children" | "className">;

    descriptionProps?: Omit<DescriptionProps, "children" | "className">;

    errorProps?: Omit<ErrorProps, "children" | "className">;

    rootClassName?: RootProps["className"];
    labelClassName?: LabelProps["className"];
    inputClassName?: ControlProps["className"];
    descriptionClassName?: DescriptionProps["className"];
    errorClassName?: ErrorProps["className"];
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

  const inputId = typeof inputProps.id === "string" ? inputProps.id : undefined;

  const descriptionId = inputId ? `${inputId}-description` : undefined;

  const errorId = inputId ? `${inputId}-error` : undefined;

  const describedBy = hasError ? errorId : descriptionId;

  const { i18n } = useTranslation();

  return (
    <Field.Root
      invalid={hasError}
      className={(state) =>
        twMerge(
          "flex w-full flex-col gap-1",
          typeof rootClassName === "function"
            ? rootClassName(state)
            : rootClassName,
        )
      }
    >
      {label ? (
        <Field.Label
          {...labelProps}
          htmlFor={inputId}
          className={(state) =>
            twMerge(
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
            )
          }
        >
          {label}
        </Field.Label>
      ) : null}

      <Field.Control
        {...inputProps}
        id={inputId}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className={(state) =>
          twMerge(
            `
                w-full
                rounded-lg
                border
              border-line
              bg-ink
                px-3
                py-2.5
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
          )
        }
      />

      {hasError ? (
        <Field.Error
          {...errorProps}
          id={errorId}
          match
          className={(state) =>
            twMerge(
              "text-xs text-rust font-mono",
              typeof errorClassName === "function"
                ? errorClassName(state)
                : errorClassName,
            )
          }
        >
          {error}
        </Field.Error>
      ) : description ? (
        <Field.Description
          {...descriptionProps}
          id={descriptionId}
          className={(state) => {
            const lang = i18n.language?.toLowerCase();

            const languageMargin =
              lang?.startsWith("ar") || lang?.startsWith("en") ? "ms-1" : "";

            return twMerge(
              "select-none text-xs font-medium text-smoke font-mono",
              languageMargin,
              typeof descriptionClassName === "function"
                ? descriptionClassName(state)
                : descriptionClassName,
            );
          }}
        >
          {description}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export default InputField;
