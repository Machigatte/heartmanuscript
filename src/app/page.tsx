"use client";
import ConfirmDialogRenderer from "@/components/ConfirmDialogRenderer";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { RecordEditor } from "@/containers/RecordEditor";
import { ConfirmDialogProvider } from "@/contexts/ConfirmDialogContext";
import { DataProvider } from "@/dataManager";

export default function RecordInterface() {
  return (
    <DataProvider>
      <ConfirmDialogProvider>
        <div className="flex h-screen">
          {/* 左侧历史记录 */}
          <Sidebar />

          {/* 右侧主区域 */}
          <main className="flex-1 flex flex-col">
            <RecordEditor />
          </main>
        </div>

        <ConfirmDialogRenderer />
        <Toaster position="top-center" duration={1000} />
      </ConfirmDialogProvider>
    </DataProvider>
  );
}
