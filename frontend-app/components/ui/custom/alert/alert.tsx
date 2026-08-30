import * as React from "react";
import {
  Alert as AlertBase,
  AlertTitle as AlertTitleBase,
  AlertDescription as AlertDescriptionBase,
  AlertAction as AlertActionBase,
} from "../../alert";

// کامپوننت کاستوم Alert
export function Alert({
  className,
  ...props
}: React.ComponentProps<typeof AlertBase>) {
  return (
    <AlertBase data-slot="custom-alert" className={className} {...props} />
  );
}

// کامپوننت کاستوم AlertTitle
export function AlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertTitleBase>) {
  return (
    <AlertTitleBase
      data-slot="custom-alert-title"
      className={className}
      {...props}
    />
  );
}

// کامپوننت کاستوم AlertDescription
export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDescriptionBase>) {
  return (
    <AlertDescriptionBase
      data-slot="custom-alert-description"
      className={className}
      {...props}
    />
  );
}

// کامپوننت کاستوم AlertAction
export function AlertAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertActionBase>) {
  return (
    <AlertActionBase
      data-slot="custom-alert-action"
      className={className}
      {...props}
    />
  );
}
