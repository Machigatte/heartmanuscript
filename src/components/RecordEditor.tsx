import React, { useEffect } from "react";
import { RecordEditorProvider, useRecordEditor } from "./RecordEditorContext";
import { defaultRecord, useData } from "@/dataManager";
import { EditorContent } from "@/components/EditorContent";
import { EditorFooter } from "@/components/EditorFooter";
import { EditorHeader } from "@/components/EditorHeader";
import _ from 'lodash';

function RecordLoader() {
  const { record, setRecord } = useRecordEditor();
  const { state, dispatch } = useData();
  const { currentRecordId, records } = state;

  useEffect(() => {
    if (currentRecordId) {
      // 记录存在
      const current = records.find(r => r.id === currentRecordId);
      if (current) {
        setRecord(r => ({ ...r, ...current }));
      }
    } else {
      // 创建新草稿
      setRecord(defaultRecord());
    }
  }, [currentRecordId, records, setRecord]);

  useEffect(() => {
    // 对比record和state中的当前记录，若不同则设置isModified为true
    if (currentRecordId) {
      const current = records.find(r => r.id === currentRecordId);
      if (current) {
        const isModified = !_.isEqual(current, record)
        dispatch({ type: 'SET_MODIFIED', payload: isModified });
      }
    } else {
      // 新建草稿，若record不等于defaultRecord则视为修改
      const isModified = !_.isEqual(record, defaultRecord())
      dispatch({ type: 'SET_MODIFIED', payload: isModified });
    }
  }, [currentRecordId, dispatch, record, records])

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
