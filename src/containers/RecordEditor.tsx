"use client";

import { EditorContent } from "@/components/EditorContent";
import { EditorFooter } from "@/components/EditorFooter";
import { EditorHeader } from "@/components/EditorHeader";
import React from "react";

export function RecordEditor() {
  return (
    <React.Fragment>
      <EditorHeader />
      <EditorContent />
      <EditorFooter />
    </React.Fragment>
  );
}
