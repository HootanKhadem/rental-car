"use client";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  customBg?: string; // CSS color string to override background
  customColor?: string; // CSS color string to override text color
  customBorder?: string; // CSS color string to override border color
  hoverBg?: string; // CSS color string to apply on hover for background
  hoverColor?: string; // CSS color string to apply on hover for text
  hoverBorder?: string; // CSS color string to apply on hover for border
  bgClass?: string; // Tailwind class to apply for background, e.g. 'bg-cd-yellow'
  textClass?: string; // Tailwind class to apply for text color, e.g. 'text-cd-bg'
  borderClass?: string; // Tailwind border class e.g. 'border-divider-line' or 'border-2'
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
  customBorder,
  bgClass,
  textClass,
  borderClass,
  hoverBg,
  hoverColor,
  hoverBorder,
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
  if (borderClass) classesArr.push(borderClass);
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

  // Resolve border color from `customBorder` or `borderClass` when possible
  if (customBorder) {
    mergedStyle.borderColor = customBorder;
    mergedStyle.borderStyle = mergedStyle.borderStyle ?? "solid";
  } else if (borderClass && borderClass.startsWith("border-")) {
    const name = borderClass.replace(/^border-/, "");
    const varName = `--color-${name}`;
    // Use CSS variable reference deterministically so server and client match
    mergedStyle.borderColor = `var(${varName})`;
    mergedStyle.borderStyle = mergedStyle.borderStyle ?? "solid";
  }

  // Prefer the already-resolved background in mergedStyle (often a CSS var)
  const resolvedBg: string | undefined = mergedStyle.backgroundColor as
    | string
    | undefined;

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
      //eslint-disable-next-line
    } catch (e) {
      return undefined;
    }
  };

  const hoverBgToken =
    className || "" ? findHoverBgToken(className) : undefined;
  const hoverBgColor = React.useMemo(() => {
    if (!hoverBgToken || typeof document === "undefined") return undefined;
    return computeBgFromClass(hoverBgToken);
    //eslint-disable-next-line
  }, [hoverBgToken, className]);

  //eslint-disable-next-line
  const [isHover, setIsHover] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement | null>(null);

  // Apply DOM-only computed styles after mount to avoid server/client
  // differences that cause hydration mismatches.
  React.useEffect(() => {
    if (typeof document === "undefined" || !ref.current) return;

    // apply resolved background color if computed
    if (resolvedBg) {
      try {
        ref.current.style.backgroundColor = resolvedBg;
        //eslint-disable-next-line
      } catch (e) {
        // ignore
      }
    }

    // apply resolved border color if present in mergedStyle
    if (mergedStyle.borderColor) {
      try {
        ref.current.style.borderColor = mergedStyle.borderColor as string;
        //eslint-disable-next-line
      } catch (e) {
        // ignore
      }
    }

    // hover handling: set inline hover styles via events to avoid initial mismatch
    const el = ref.current;
    function onEnter() {
      if (hoverBgColor) el.style.backgroundColor = hoverBgColor;
      if (hoverBg) el.style.backgroundColor = hoverBg as string;
      if (hoverColor) el.style.color = hoverColor as string;
      if (hoverBorder) el.style.borderColor = hoverBorder as string;
    }
    function onLeave() {
      if (resolvedBg) el.style.backgroundColor = resolvedBg;
      else
        el.style.backgroundColor =
          (mergedStyle.backgroundColor as string) || "";
      if (mergedStyle.color)
        el.style.color = (mergedStyle.color as string) || "";
      if (mergedStyle.borderColor)
        el.style.borderColor = (mergedStyle.borderColor as string) || "";
    }

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [
    resolvedBg,
    mergedStyle.borderColor,
    hoverBgColor,
    hoverBg,
    hoverColor,
    hoverBorder,
    mergedStyle.backgroundColor,
    mergedStyle.color,
  ]);

  return (
    <button
      type={type}
      className={classesArr.join(" ")}
      ref={ref}
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
      // only include mergedStyle props that are safe and deterministic on server
      style={{ ...mergedStyle }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
