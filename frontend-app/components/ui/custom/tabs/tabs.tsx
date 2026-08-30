"use client";

import * as React from "react";
import {
  Tabs as TabsBase,
  TabsList as TabsListBase,
  TabsTrigger as TabsTriggerBase,
  TabsContent as TabsContentBase,
} from "../../tabs";

// کامپوننت کاستوم Tabs
export function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsBase>) {
  return <TabsBase data-slot="custom-tabs" className={className} {...props} />;
}

// کامپوننت کاستوم TabsList
export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsListBase>) {
  return (
    <TabsListBase
      data-slot="custom-tabs-list"
      className={className}
      {...props}
    />
  );
}

// کامپوننت کاستوم TabsTrigger
export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsTriggerBase>) {
  return (
    <TabsTriggerBase
      data-slot="custom-tabs-trigger"
      className={className}
      {...props}
    />
  );
}

// کامپوننت کاستوم TabsContent
export function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsContentBase>) {
  return (
    <TabsContentBase
      data-slot="custom-tabs-content"
      className={className}
      {...props}
    />
  );
}
