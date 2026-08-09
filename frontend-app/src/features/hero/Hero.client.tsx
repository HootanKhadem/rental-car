"use client";
import React from "react";
import Button from "@/components/ui/Button";

export default function HeroClient() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 font-[monospace]">
        <Button variant="solid" size="lg" rounded="lg" bgClass="bg-button-primary-yellow" textClass="text-black" className="hover:opacity-95 text-xs sm:text-[16px]">
          BROWSE THE FLEET
        </Button>
        <Button variant="outline" size="lg" rounded="lg" className="hover:border hover:border-title-yellow hover:text-title-yellow hover:bg-transparent text-xs sm:text-[16px]">
          MEET THE AI ASSISTANT
        </Button>
      </div>
    </div>
  );
}
