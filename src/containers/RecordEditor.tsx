"use client";

import React, { useEffect } from "react";
import { RecordEditorProvider, useRecordEditor } from "./RecordEditorContext";
import { fetchRecordById } from "../services/recordService";
import { EditorContent } from "@/components/EditorContent";
import { EditorFooter } from "@/components/EditorFooter";
import { EditorHeader } from "@/components/EditorHeader";


// 内部组件用于加载record数据
function RecordLoader({ recordId }: { recordId?: string }) {
  const { setRecord } = useRecordEditor();
  useEffect(() => {
    if (recordId) {
      fetchRecordById(recordId).then(data => setRecord(r => ({ ...r, ...data })));
    }
  }, [recordId, setRecord]);
  return <>
    <EditorHeader />
    <EditorContent />
    <EditorFooter />
  </>;
}

// 支持传入recordId
export function RecordEditor({ recordId }: { recordId?: string }) {
  return (
    <RecordEditorProvider>
      <RecordLoader recordId={recordId} />
    </RecordEditorProvider>
  );
}
