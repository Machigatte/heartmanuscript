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

  // 每秒更新时间
  // useEffect(() => {
  //   const updateTime = () => {
  //     setRecord((r) => {
  //       if (!r) return r;
  //       return {
  //         ...r,
  //         updatedAt: new Date().toLocaleString("zh-CN", {
  //           year: "numeric",
  //           month: "2-digit",
  //           day: "2-digit",
  //           hour: "2-digit",
  //           minute: "2-digit",
  //           second: "2-digit",
  //           hour12: false,
  //         })
  //       };
  //     });
  //   };
  //   updateTime();
  //   const timer = setInterval(updateTime, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <RecordEditorContext.Provider value={{ record, setRecord }}>
      {children}
    </RecordEditorContext.Provider>
  );
};
