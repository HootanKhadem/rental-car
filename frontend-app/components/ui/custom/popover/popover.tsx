"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { twMerge } from "tailwind-merge";

type TriggerState = {
  open: boolean;
};

type ContentState = {
  open: boolean;
  side: "top" | "right" | "bottom" | "left";
  align: "start" | "center" | "end";
};

type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;
type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;
type PopoverArrowProps = React.ComponentProps<typeof PopoverPrimitive.Arrow>;

export type PopoverProps = React.ComponentProps<
  typeof PopoverPrimitive.Root
> & {
  /**
   * Element that opens the popover.
   *
   * Example:
   * <Button>Open</Button>
   */
  trigger: React.ReactElement<{ className?: string }>;

  children?: React.ReactNode;

  /**
   * Default / custom trigger styling.
   */
  triggerClassName?: string | ((state: TriggerState) => string);

  /**
   * Default / custom positioner styling.
   */
  positionerClassName?: string | ((state: ContentState) => string);

  /**
   * Default / custom popup styling.
   */
  popupClassName?: string | ((state: ContentState) => string);

  /**
   * Default / custom arrow styling.
   */
  arrowClassName?: string | ((state: ContentState) => string);

  /**
   * Whether to render the arrow.
   */
  showArrow?: boolean;

  /**
   * Distance between trigger and popup.
   */
  sideOffset?: PopoverContentProps["sideOffset"];

  /**
   * Alignment offset.
   */
  alignOffset?: PopoverContentProps["alignOffset"];

  /**
   * Position relative to trigger.
   */
  side?: PopoverContentProps["side"];

  /**
   * Alignment relative to trigger.
   */
  align?: PopoverContentProps["align"];

  /**
   * Additional props for the trigger.
   */
  triggerProps?: Omit<
    PopoverTriggerProps,
    "className" | "children" | "asChild"
  >;

  /**
   * Additional props for the positioned popover container.
   */
  positionerProps?: Omit<
    PopoverContentProps,
    "className" | "children" | "side" | "align" | "sideOffset" | "alignOffset"
  >;

  /**
   * Additional props for the popover content.
   */
  popupProps?: Omit<
    PopoverContentProps,
    "className" | "children" | "side" | "align" | "sideOffset" | "alignOffset"
  >;

  /**
   * Additional props for the arrow.
   */
  arrowProps?: Omit<PopoverArrowProps, "className">;
};

export function Popover({
  trigger,
  children,

  triggerClassName,
  positionerClassName,
  popupClassName,
  arrowClassName,

  showArrow = false,

  sideOffset = 8,
  alignOffset,
  side,
  align,

  triggerProps,
  positionerProps,
  popupProps,
  arrowProps,

  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  ...rootProps
}: PopoverProps) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false,
  );
  const open = isControlled ? Boolean(controlledOpen) : uncontrolledOpen;

  const resolvedSide = side ?? "bottom";
  const resolvedAlign = align ?? "center";

  const triggerState: TriggerState = { open };
  const contentState: ContentState = {
    open,
    side: resolvedSide,
    align: resolvedAlign,
  };

  function handleOpenChange(nextOpen: boolean) {
    if (!isControlled) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  const enhancedTrigger = React.cloneElement(trigger, {
    className: twMerge(
      "cursor-pointer outline-none",
      trigger.props.className,
      typeof triggerClassName === "function"
        ? triggerClassName(triggerState)
        : triggerClassName,
    ),
  });

  return (
    <PopoverPrimitive.Root
      {...rootProps}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <PopoverPrimitive.Trigger {...triggerProps} asChild>
        {enhancedTrigger}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          {...positionerProps}
          {...popupProps}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={twMerge(
            "z-50",
            typeof positionerClassName === "function"
              ? positionerClassName(contentState)
              : positionerClassName,
            `
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
              origin-(--radix-popover-content-transform-origin)
              data-[state=open]:animate-in
              data-[state=open]:fade-in-0
              data-[state=open]:zoom-in-95
              data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0
              data-[state=closed]:zoom-out-95
            `,
            typeof popupClassName === "function"
              ? popupClassName(contentState)
              : popupClassName,
          )}
        >
          {showArrow ? (
            <PopoverPrimitive.Arrow
              {...arrowProps}
              className={twMerge(
                `
                  fill-graphite
                  stroke-line
                  stroke-[0.5]
                `,
                typeof arrowClassName === "function"
                  ? arrowClassName(contentState)
                  : arrowClassName,
              )}
            />
          ) : null}

          <div>{children}</div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export default Popover;
