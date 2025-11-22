"use client";
import { Home } from "@/components/home";
import { useRequireAuth } from "@/hooks/use-require-auth";
import React from "react";

export default function NotePage() {
  useRequireAuth();

  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
}
