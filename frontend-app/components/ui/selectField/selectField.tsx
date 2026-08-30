"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";

type SelectRootProps = React.ComponentProps<typeof Select>;
type SelectLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
type SelectTriggerProps = React.ComponentProps<typeof SelectTrigger>;
type SelectValueProps = React.ComponentProps<typeof SelectValue>;
type SelectPositionerProps = React.ComponentProps<typeof SelectContent>;
type SelectPopupProps = React.ComponentProps<typeof SelectContent>;
type SelectListProps = React.HTMLAttributes<HTMLDivElement>;
type SelectItemProps = React.ComponentProps<typeof SelectItem>;
type SelectItemTextProps = React.ComponentProps<typeof SelectItemText>;
type SelectItemIndicatorProps = React.ComponentProps<
  typeof SelectItemIndicator
>;

export type SelectFieldOption<T = string> = {
  label: React.ReactNode;
  value: T;
  disabled?: boolean;
};

export type SelectFieldProps = Omit<SelectRootProps, "children"> & {
  /**
   * Label displayed above the select.
   */
  label?: React.ReactNode;

  /**
   * Placeholder displayed when no value is selected.
   */
  placeholder?: React.ReactNode;

  /**
   * Options displayed inside the dropdown.
   */
  options: SelectFieldOption[];

  /**
   * Description displayed below the select.
   * Hidden when an error exists.
   */
  description?: React.ReactNode;

  /**
   * Error displayed below the select.
   * Replaces the description.
   */
  error?: React.ReactNode;

  /**
   * Whether the field is required.
   */
  required?: boolean;

  /**
   * Props passed directly to the label.
   */
  labelProps?: Omit<SelectLabelProps, "children" | "className">;

  /**
   * Props passed directly to the trigger.
   */
  triggerProps?: Omit<SelectTriggerProps, "className">;

  /**
   * Props passed directly to the value.
   */
  valueProps?: Omit<SelectValueProps, "className">;

  /**
   * Props passed directly to the positioner.
   */
  positionerProps?: Omit<SelectPositionerProps, "className">;

  /**
   * Props passed directly to the popup.
   */
  popupProps?: Omit<SelectPopupProps, "className">;

  /**
   * Props passed directly to the list.
   */
  listProps?: Omit<SelectListProps, "className">;

  /**
   * Props passed directly to every item.
   */
  itemProps?: Omit<SelectItemProps, "className" | "children">;

  /**
   * Props passed directly to every item text.
   */
  itemTextProps?: Omit<SelectItemTextProps, "className" | "children">;

  /**
   * Props passed directly to every item indicator.
   */
  itemIndicatorProps?: Omit<SelectItemIndicatorProps, "className" | "children">;

  /**
   * Override the root styles.
   */
  rootClassName?: string;

  /**
   * Override the label styles.
   */
  labelClassName?: string;

  /**
   * Override the trigger styles.
   */
  triggerClassName?: string;

  /**
   * Override the value styles.
   */
  valueClassName?: string;

  /**
   * Override the positioner styles.
   */
  positionerClassName?: string;

  /**
   * Override the popup styles.
   */
  popupClassName?: string;

  /**
   * Override the list styles.
   */
  listClassName?: string;

  /**
   * Override the item styles.
   */
  itemClassName?: string;

  /**
   * Override the item text styles.
   */
  itemTextClassName?: string;

  /**
   * Override the item indicator styles.
   */
  itemIndicatorClassName?: string;

  /**
   * Override the description styles.
   */
  descriptionClassName?: string;

  /**
   * Override the error styles.
   */
  errorClassName?: string;

  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
};

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
      style={{
        display: "block",
        ...props.style,
      }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

export function SelectField({
  label,
  placeholder,
  options,
  description,
  error,
  required = false,
  onBlur,

  labelProps,
  triggerProps,
  valueProps,
  positionerProps,
  popupProps,
  listProps,
  itemProps,
  itemTextProps,
  itemIndicatorProps,

  rootClassName,
  labelClassName,
  triggerClassName,
  valueClassName,
  positionerClassName,
  popupClassName,
  listClassName,
  itemClassName,
  itemTextClassName,
  itemIndicatorClassName,
  descriptionClassName,
  errorClassName,

  ...rootProps
}: SelectFieldProps) {
  const hasError = Boolean(error);
  const { i18n } = useTranslation();
  const lang = i18n?.language?.toLowerCase();
  const isRTL = lang?.startsWith("ar");
  const direction = isRTL ? "rtl" : "ltr";

  return (
    <div
      dir={direction}
      className={twMerge("flex w-full flex-col gap-1", rootClassName)}
    >
      {label ? (
        <label
          {...labelProps}
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
            labelClassName,
          )}
        >
          {label}
        </label>
      ) : null}

      <Select dir={direction} {...rootProps}>
        <SelectTrigger
          dir={direction}
          {...triggerProps}
          onBlur={(event) => {
            triggerProps?.onBlur?.(event);
            onBlur?.(event);
          }}
          aria-invalid={hasError || undefined}
          aria-required={required || undefined}
          className={twMerge(
            `
              flex
              w-full
              items-center
              justify-between
              gap-2
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

              focus-visible:border-gold-bright
              focus-visible:ring-2
              focus-visible:ring-gold/20

              data-[state=open]:border-gold-bright
              data-[state=open]:ring-2
              data-[state=open]:ring-gold/20

              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:border-line

              aria-invalid:border-rust
              aria-invalid:hover:border-rust
              aria-invalid:focus-visible:border-rust
              aria-invalid:ring-rust/20
            `,
            triggerClassName,
          )}
        >
          <SelectValue
            {...valueProps}
            placeholder={placeholder}
            className={twMerge(
              "min-w-0 flex-1 truncate text-start text-sm",
              "data-placeholder:text-smoke-dim",
              valueClassName,
            )}
          />
        </SelectTrigger>

        <SelectContent
          dir={direction}
          {...positionerProps}
          {...popupProps}
          sideOffset={4}
          className={twMerge(
            "z-60",
            `
              overflow-hidden
              rounded-lg
              border
              border-line
              bg-ink
              p-1
              text-ivory
              shadow-xl
              outline-none
            `,
            positionerClassName,
            popupClassName,
          )}
        >
          <div
            {...listProps}
            className={twMerge("max-h-60 overflow-y-auto", listClassName)}
          >
            {options.map((option) => (
              <SelectItem
                key={String(option.value)}
                {...itemProps}
                value={String(option.value)}
                disabled={option.disabled}
                className={twMerge(
                  `
                    relative
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    rounded-lg

                    px-3
                    py-2

                    text-sm
                    text-ivory

                    outline-none

                    transition-colors

                    hover:bg-raised

                    data-highlighted:bg-gold
                    data-highlighted:text-ivory

                    data-[state=checked]:text-gold-bright

                    data-disabled:pointer-events-none
                    data-disabled:opacity-50
                    text-start
                  `,
                  itemClassName,
                )}
              >
                <span
                  className={twMerge(
                    "pointer-events-none absolute inset-y-0 flex w-4 items-center justify-center text-gold",
                    isRTL ? "left-3" : "right-3",
                    itemIndicatorClassName,
                  )}
                >
                  <SelectItemIndicator {...itemIndicatorProps}>
                    <CheckIcon />
                  </SelectItemIndicator>
                </span>

                <SelectItemText
                  {...itemTextProps}
                  className={twMerge(
                    "min-w-0 flex-1 truncate",
                    itemTextClassName,
                  )}
                >
                  {option.label}
                </SelectItemText>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>

      {hasError ? (
        <div
          role="alert"
          className={twMerge("text-xs text-rust font-mono", errorClassName)}
        >
          {error}
        </div>
      ) : description ? (
        <p
          className={twMerge(
            "select-none text-xs font-medium text-smoke font-mono",
            lang?.startsWith("ar") || lang?.startsWith("en") ? "ms-1" : "",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SelectField;
