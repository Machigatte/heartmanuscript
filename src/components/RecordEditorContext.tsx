import { defaultRecord, RecordData } from "@/dataManager";
import React, { createContext, useContext, useState, useEffect } from "react";

interface RecordEditorContextProps {
  record: RecordData;
  setRecord: React.Dispatch<React.SetStateAction<RecordData>>;
}

const RecordEditorContext = createContext<RecordEditorContextProps | undefined>(undefined);

export const useRecordEditor = () => {
  const ctx = useContext(RecordEditorContext);
  if (!ctx) throw new Error("useRecordEditor must be used within RecordEditorProvider");
  return ctx;
};

export const RecordEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [record, setRecord] = useState<RecordData>(defaultRecord());

  return (
    <RecordEditorContext.Provider value={{ record, setRecord }}>
      {children}
    </RecordEditorContext.Provider>
  );
};
