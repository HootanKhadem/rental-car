"use client";

import * as React from "react";
import { Select } from "@base-ui/react/select";
import { Field } from "@base-ui/react/field";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";

type SelectRootProps = React.ComponentProps<typeof Select.Root>;
type SelectLabelProps = React.ComponentProps<typeof Field.Label>;
type SelectTriggerProps = React.ComponentProps<typeof Select.Trigger>;
type SelectValueProps = React.ComponentProps<typeof Select.Value>;
type SelectPositionerProps = React.ComponentProps<typeof Select.Positioner>;
type SelectPopupProps = React.ComponentProps<typeof Select.Popup>;
type SelectListProps = React.ComponentProps<typeof Select.List>;
type SelectItemProps = React.ComponentProps<typeof Select.Item>;
type SelectItemTextProps = React.ComponentProps<typeof Select.ItemText>;
type SelectItemIndicatorProps = React.ComponentProps<
  typeof Select.ItemIndicator
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

function CaretUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{
        display: "block",
        ...props.style,
      }}
    >
      <path d="M11 10H5l3 3.5zm0-4H5l3-3.5z" />
    </svg>
  );
}

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
  const lang = i18n.language?.toLowerCase();
  const isRTL = lang?.startsWith("ar");
  const direction = isRTL ? "rtl" : "ltr";

  return (
    <Field.Root
      dir={direction}
      className={twMerge("flex w-full flex-col gap-1", rootClassName)}
    >
      {label ? (
        <Field.Label
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
        </Field.Label>
      ) : null}

      <Select.Root {...rootProps}>
        <Select.Trigger
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

              data-popup-open:border-gold-bright
              data-popup-open:ring-2
              data-popup-open:ring-gold/20

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
          <Select.Value
            {...valueProps}
            placeholder={placeholder}
            className={twMerge(
              "min-w-0 flex-1 truncate text-start text-sm",
              "data-placeholder:text-smoke-dim",
              valueClassName,
            )}
          />

          <Select.Icon>
            <CaretUpDownIcon className="shrink-0 text-smoke" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Positioner
            {...positionerProps}
            sideOffset={4}
            className={twMerge("z-60", positionerClassName)}
          >
            <Select.Popup
              dir={direction}
              {...popupProps}
              className={twMerge(
                `
                  min-w-var(--anchor-width)
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
                popupClassName,
              )}
            >
              <Select.List
                {...listProps}
                className={twMerge("max-h-60 overflow-y-auto", listClassName)}
              >
                {options.map((option) => (
                  <Select.Item
                    dir={direction}
                    key={String(option.value)}
                    {...itemProps}
                    value={option.value}
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

                        data-highlighted:bg-raised
                        data-highlighted:text-ivory

                        data-selected:text-gold-bright

                        data-disabled:pointer-events-none
                        data-disabled:opacity-50
                        text-start
                      `,
                      itemClassName,
                    )}
                  >
                    <Select.ItemIndicator
                      {...itemIndicatorProps}
                      className={twMerge(
                        `
                          flex
                          w-4
                          shrink-0
                          items-center
                          justify-center
                          text-gold
                           text-start
                        `,
                        isRTL ? "ml-2" : "mr-2",
                        itemIndicatorClassName,
                      )}
                    >
                      <CheckIcon />
                    </Select.ItemIndicator>

                    <Select.ItemText
                      {...itemTextProps}
                      className={twMerge(
                        "min-w-0 flex-1 truncate",
                        itemTextClassName,
                      )}
                    >
                      {option.label}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>

      {hasError ? (
        <div
          role="alert"
          className={twMerge("text-xs text-rust font-mono", errorClassName)}
        >
          {error}
        </div>
      ) : description ? (
        <Field.Description
          className={() => {
            const lang = i18n.language?.toLowerCase();
            const languageMargin =
              lang?.startsWith("ar") || lang?.startsWith("en") ? "ms-1" : "";

            return twMerge(
              "select-none text-xs font-medium text-smoke font-mono",
              languageMargin,
              descriptionClassName,
            );
          }}
          //className={twMerge("text-xs text-smoke", descriptionClassName)}
        >
          {description}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export default SelectField;
