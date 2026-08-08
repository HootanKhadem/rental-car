"use client";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  customBg?: string; // CSS color string to override background
  customColor?: string; // CSS color string to override text color
  bgClass?: string; // Tailwind class to apply for background, e.g. 'bg-cd-yellow'
  textClass?: string; // Tailwind class to apply for text color, e.g. 'text-cd-bg'
  fullWidth?: boolean;
  className?: string;
};

const sizeMap: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const roundedMap: Record<NonNullable<ButtonProps["rounded"]>, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export function Button({
  children,
  variant = "solid",
  size = "md",
  rounded = "md",
  customBg,
  customColor,
  bgClass,
  textClass,
  fullWidth = false,
  className = "",
  type = "button",
  style,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center cursor-pointer justify-center transition focus:outline-none";
  const variantCls =
    variant === "solid"
      ? "bg-zinc-900 text-white border border-zinc-800 hover:brightness-95"
      : variant === "outline"
        ? "bg-transparent border border-zinc-700 text-white"
        : "bg-transparent text-white";

  const classesArr: string[] = [
    base,
    variantCls,
    sizeMap[size],
    roundedMap[rounded],
    fullWidth ? "w-full" : "inline-block",
  ];

  if (bgClass) classesArr.push(bgClass);
  if (textClass) classesArr.push(textClass);
  if (className) classesArr.push(className);

  const mergedStyle: React.CSSProperties = { ...style };
  if (customBg) mergedStyle.backgroundColor = customBg;
  if (customColor) mergedStyle.color = customColor;

  // Map bgClass/textClass to CSS variables or sensible fallbacks
  if (!customBg && bgClass && bgClass.startsWith("bg-")) {
    if (bgClass === "bg-white") mergedStyle.backgroundColor = "#ffffff";
    else if (bgClass === "bg-black") mergedStyle.backgroundColor = "#000000";
    else {
      const varName = `--color-${bgClass.replace(/^bg-/, "")}`;
      mergedStyle.backgroundColor = `var(${varName})`;
    }
  }

  if (!customColor && textClass && textClass.startsWith("text-")) {
    if (textClass === "text-white") mergedStyle.color = "#ffffff";
    else if (textClass === "text-black") mergedStyle.color = "#000000";
    else {
      const varName = `--color-${textClass.replace(/^text-/, "")}`;
      mergedStyle.color = `var(${varName})`;
    }
  }

  // Resolve CSS variable for bgClass synchronously and provide a sensible fallback.
  let resolvedBg: string | undefined = mergedStyle.backgroundColor as
    | string
    | undefined;
  if (typeof document !== "undefined") {
    if (customBg) {
      resolvedBg = customBg;
    } else if (bgClass && bgClass.startsWith("bg-")) {
      const name = bgClass.replace(/^bg-/, "");
      const varName = `--color-${name}`;
      try {
        const val = getComputedStyle(document.documentElement)
          .getPropertyValue(varName)
          .trim();
        if (val) resolvedBg = `var(${varName})`;
        else {
          const fallbackMap: Record<string, string> = {
            "title-yellow": "#E2BB7F",
            "button-primary-green": "#0b7a4a",
          };
          resolvedBg = fallbackMap[name] ?? "#E2BB7F";
        }
      } catch (e) {
        const fallbackMap: Record<string, string> = {
          "title-yellow": "#E2BB7F",
          "button-primary-green": "#0b7a4a",
        };
        resolvedBg = fallbackMap[name] ?? "#E2BB7F";
      }
    }
  }

  // Hover fallback: detect `hover:bg-...` in className and compute its color
  // synchronously using a temporary element (memoized) so we don't call setState
  // inside effects.
  const findHoverBgToken = (cn: string) => {
    const m = cn.match(/hover:bg-([^\s]+)/);
    if (!m) return undefined;
    return `bg-${m[1]}`;
  };

  const computeBgFromClass = (bgToken: string) => {
    if (typeof document === "undefined") return undefined;
    try {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.visibility = "hidden";
      el.className = bgToken;
      document.body.appendChild(el);
      const val = getComputedStyle(el).backgroundColor;
      document.body.removeChild(el);
      return val || undefined;
    } catch (e) {
      return undefined;
    }
  };

  const hoverBgToken =
    className || "" ? findHoverBgToken(className) : undefined;
  const hoverBgColor = React.useMemo(() => {
    if (!hoverBgToken || typeof document === "undefined") return undefined;
    return computeBgFromClass(hoverBgToken);
  }, [hoverBgToken, className]);

  const [isHover, setIsHover] = React.useState(false);

  return (
    <button
      type={type}
      className={classesArr.join(" ")}
      onMouseEnter={(e) => {
        setIsHover(true);
        if (typeof rest.onMouseEnter === "function")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          rest.onMouseEnter(e as any);
      }}
      onMouseLeave={(e) => {
        setIsHover(false);
        if (typeof rest.onMouseLeave === "function")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          rest.onMouseLeave(e as any);
      }}
      style={{
        ...mergedStyle,
        ...(resolvedBg ? { backgroundColor: resolvedBg } : {}),
        ...(isHover && hoverBgColor ? { backgroundColor: hoverBgColor } : {}),
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
