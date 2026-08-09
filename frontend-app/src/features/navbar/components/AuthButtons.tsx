"use client";
import React from "react";
import { Button } from "@/components/ui/Button";

export default function AuthButtons() {
  return (
    <div className="hidden md:flex items-center gap-3 font-[monospace]">
      <Button
        variant="outline"
        size="md"
        rounded="md"
        className="hover:border hover:border-title-yellow hover:text-title-yellow hover:bg-transparent"
      >
        SIGN IN
      </Button>
      <Button
        variant="solid"
        size="md"
        rounded="md"
        bgClass="bg-button-primary-green"
        textClass="text-white"
        className="hover:opacity-95"
      >
        REGISTER
      </Button>
    </div>
  );
}
