"use client";
import { Sidebar } from "@/components/Sidebar";
import { RecordEditor } from "@/containers/RecordEditor";

export default function RecordInterface() {
  return (
    <div className="flex h-screen">
      {/* 左侧历史记录 */}
      <Sidebar />

      {/* 右侧主区域 */}
      <main className="flex-1 flex flex-col">
        <RecordEditor />
      </main>
    </div>
  );
}
