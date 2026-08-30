import * as React from "react";
import {
  Card as CardBase,
  CardHeader as CardHeaderBase,
  CardTitle as CardTitleBase,
  CardDescription as CardDescriptionBase,
  CardAction as CardActionBase,
  CardContent as CardContentBase,
  CardFooter as CardFooterBase,
} from "@/components/ui/card";

// کامپوننت کاستوم Card
const Card = React.forwardRef<
  React.ComponentRef<typeof CardBase>,
  React.ComponentProps<typeof CardBase>
>(({ className, ...props }, ref) => {
  return (
    <CardBase
      ref={ref}
      data-slot="custom-card"
      className={className}
      {...props}
    />
  );
});
Card.displayName = "CustomCard";

// کامپوننت کاستوم CardHeader
const CardHeader = React.forwardRef<
  React.ComponentRef<typeof CardHeaderBase>,
  React.ComponentProps<typeof CardHeaderBase>
>(({ className, ...props }, ref) => {
  return (
    <CardHeaderBase
      ref={ref}
      data-slot="custom-card-header"
      className={className}
      {...props}
    />
  );
});
CardHeader.displayName = "CustomCardHeader";

// کامپوننت کاستوم CardTitle
const CardTitle = React.forwardRef<
  React.ComponentRef<typeof CardTitleBase>,
  React.ComponentProps<typeof CardTitleBase>
>(({ className, ...props }, ref) => {
  return (
    <CardTitleBase
      ref={ref}
      data-slot="custom-card-title"
      className={className}
      {...props}
    />
  );
});
CardTitle.displayName = "CustomCardTitle";

// کامپوننت کاستوم CardDescription
const CardDescription = React.forwardRef<
  React.ComponentRef<typeof CardDescriptionBase>,
  React.ComponentProps<typeof CardDescriptionBase>
>(({ className, ...props }, ref) => {
  return (
    <CardDescriptionBase
      ref={ref}
      data-slot="custom-card-description"
      className={className}
      {...props}
    />
  );
});
CardDescription.displayName = "CustomCardDescription";

// کامپوننت کاستوم CardAction
const CardAction = React.forwardRef<
  React.ComponentRef<typeof CardActionBase>,
  React.ComponentProps<typeof CardActionBase>
>(({ className, ...props }, ref) => {
  return (
    <CardActionBase
      ref={ref}
      data-slot="custom-card-action"
      className={className}
      {...props}
    />
  );
});
CardAction.displayName = "CustomCardAction";

// کامپوننت کاستوم CardContent
const CardContent = React.forwardRef<
  React.ComponentRef<typeof CardContentBase>,
  React.ComponentProps<typeof CardContentBase>
>(({ className, ...props }, ref) => {
  return (
    <CardContentBase
      ref={ref}
      data-slot="custom-card-content"
      className={className}
      {...props}
    />
  );
});
CardContent.displayName = "CustomCardContent";

// کامپوننت کاستوم CardFooter
const CardFooter = React.forwardRef<
  React.ComponentRef<typeof CardFooterBase>,
  React.ComponentProps<typeof CardFooterBase>
>(({ className, ...props }, ref) => {
  return (
    <CardFooterBase
      ref={ref}
      data-slot="custom-card-footer"
      className={className}
      {...props}
    />
  );
});
CardFooter.displayName = "CustomCardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
