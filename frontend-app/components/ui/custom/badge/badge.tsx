import * as React from "react";
import { Badge as BadgeBase, badgeVariants } from "../../badge";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

// استخراج تایپ دقیق از کامپوننت بیس
type BadgeBaseProps = React.ComponentProps<typeof BadgeBase>;

export const Badge = React.forwardRef<
  React.ElementRef<typeof BadgeBase>,
  BadgeBaseProps & VariantProps<typeof badgeVariants>
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <BadgeBase
      ref={ref}
      data-slot="custom-badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
});

Badge.displayName = "CustomBadge";

// ری‌اکسپورت کردن variantها برای استفاده در سایر کامپوننت‌ها (در صورت نیاز)
export { badgeVariants };
