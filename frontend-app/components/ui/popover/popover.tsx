"use client";

import * as React from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { twMerge } from "tailwind-merge";

type PopoverTriggerProps = React.ComponentProps<typeof BasePopover.Trigger>;

type PopoverPositionerProps = React.ComponentProps<
  typeof BasePopover.Positioner
>;

type PopoverPopupProps = React.ComponentProps<typeof BasePopover.Popup>;

type PopoverArrowProps = React.ComponentProps<typeof BasePopover.Arrow>;

export type PopoverProps = React.ComponentProps<typeof BasePopover.Root> & {
  /**
   * Element that opens the popover.
   *
   * Example:
   * <Button>Open</Button>
   */
  trigger: React.ReactElement;

  children?: React.ReactNode;

  /**
   * Default / custom trigger styling.
   */
  triggerClassName?: PopoverTriggerProps["className"];

  /**
   * Default / custom positioner styling.
   */
  positionerClassName?: PopoverPositionerProps["className"];

  /**
   * Default / custom popup styling.
   */
  popupClassName?: PopoverPopupProps["className"];

  /**
   * Default / custom arrow styling.
   */
  arrowClassName?: PopoverArrowProps["className"];

  /**
   * Whether to render the arrow.
   */
  showArrow?: boolean;

  /**
   * Distance between trigger and popup.
   */
  sideOffset?: PopoverPositionerProps["sideOffset"];

  /**
   * Alignment offset.
   */
  alignOffset?: PopoverPositionerProps["alignOffset"];

  /**
   * Position relative to trigger.
   */
  side?: PopoverPositionerProps["side"];

  /**
   * Alignment relative to trigger.
   */
  align?: PopoverPositionerProps["align"];

  /**
   * Additional props for the Base UI Trigger.
   */
  triggerProps?: Omit<PopoverTriggerProps, "className" | "children">;

  /**
   * Additional props for the Base UI Positioner.
   */
  positionerProps?: Omit<PopoverPositionerProps, "className" | "children">;

  /**
   * Additional props for the Base UI Popup.
   */
  popupProps?: Omit<PopoverPopupProps, "className" | "children">;

  /**
   * Additional props for the Base UI Arrow.
   */
  arrowProps?: Omit<PopoverArrowProps, "className">;
};

export function Popover({
  trigger,
  children,

  triggerClassName,
  positionerClassName,
  popupClassName,
  // arrowClassName,

  // showArrow = true,

  sideOffset = 8,
  alignOffset,
  side,
  align,

  triggerProps,
  positionerProps,
  popupProps,
  // arrowProps,

  ...rootProps
}: PopoverProps) {
  return (
    <BasePopover.Root {...rootProps}>
      <BasePopover.Trigger
        {...triggerProps}
        render={trigger}
        className={(state) =>
          twMerge(
            "cursor-pointer outline-none",
            typeof triggerClassName === "function"
              ? triggerClassName(state)
              : triggerClassName,
          )
        }
      />

      <BasePopover.Portal>
        <BasePopover.Positioner
          {...positionerProps}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={(state) =>
            twMerge(
              "z-50",
              typeof positionerClassName === "function"
                ? positionerClassName(state)
                : positionerClassName,
            )
          }
        >
          <BasePopover.Popup
            {...popupProps}
            className={(state) =>
              twMerge(
                `
                  z-50
                  w-max
                  max-w-[calc(100vw-2rem)]

                  rounded-[14px]

                  border
                  border-line

                  bg-graphite

                  text-ivory

                  shadow-2xl

                  outline-none

                  transition-all
                  duration-200
                  ease-out

                  data-[starting-style]:scale-95
                  data-[starting-style]:opacity-0

                  data-[ending-style]:scale-95
                  data-[ending-style]:opacity-0
                `,
                typeof popupClassName === "function"
                  ? popupClassName(state)
                  : popupClassName,
              )
            }
          >
            {/* {showArrow && (
              <BasePopover.Arrow
                {...arrowProps}
                className={(state) =>
                  twMerge(
                    `
                      size-3

                      before:block
                      before:size-3

                      before:rotate-45

                      before:border-l
                      before:border-t
                      before:border-line

                      before:bg-graphite
                    `,
                    typeof arrowClassName === "function"
                      ? arrowClassName(state)
                      : arrowClassName,
                  )
                }
              />
            )} */}

            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

export default Popover;
