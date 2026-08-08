"use client";
import React from "react";
import Button from "@/components/ui/Button";

export default function HeroClient() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="solid" size="md" rounded="md" bgClass="bg-title-yellow" textClass="text-black">
          Browse the fleet
        </Button>
        <Button variant="outline" size="md" rounded="md">
          Meet the AI assistant
        </Button>
      </div>
    </div>
  );
}
