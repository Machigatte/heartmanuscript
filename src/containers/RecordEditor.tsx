import React, { useEffect } from "react";
import { RecordEditorProvider, useRecordEditor } from "./RecordEditorContext";
import { defaultRecord, useData } from "@/dataManager";
import { EditorContent } from "@/components/EditorContent";
import { EditorFooter } from "@/components/EditorFooter";
import { EditorHeader } from "@/components/EditorHeader";


function RecordLoader() {
  const { setRecord } = useRecordEditor();
  const { state } = useData();
  const { currentRecordId, records } = state;

  useEffect(() => {
    console.log("Current Record ID:", currentRecordId);
    if (currentRecordId) {
      // 记录存在
      const current = records.find(r => r.id === currentRecordId);
      if (current) {
        setRecord(r => ({ ...r, ...current }));
      }
    } else {
      // 创建新草稿
      setRecord(defaultRecord("周报"));
    }
  }, [currentRecordId, records, setRecord]);

  return <>
    <EditorHeader />
    <EditorContent />
    <EditorFooter />
  </>;
}

// 展示当前选中的record
export function RecordEditor() {
  return (
    <RecordEditorProvider>
      <RecordLoader />
    </RecordEditorProvider>
  );
}
