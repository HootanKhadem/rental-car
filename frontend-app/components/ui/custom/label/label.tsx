import * as React from "react";
import { Label as LabelBase } from "../../label";

export function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelBase>) {
  return (
    <LabelBase data-slot="custom-label" className={className} {...props} />
  );
}
