"use client";
import ConfirmDialogRenderer from "@/components/ConfirmDialogRenderer";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { RecordEditor } from "@/containers/RecordEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { DataProvider } from "@/dataManager";
import { ConfirmDialogProvider } from "@/contexts/ConfirmDialogContext";

export default function RecordInterface() {
  return (
    <DataProvider>
      <ConfirmDialogProvider>
        <ResizablePanelGroup className="h-screen w-64" direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={20} maxSize={30}>
            {/* 左侧历史记录 */}
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="h-screen flex-1 flex flex-col">
            <RecordEditor />
          </ResizablePanel>
        </ResizablePanelGroup>
        <ConfirmDialogRenderer />
        <Toaster position="top-center" duration={1000} />
      </ConfirmDialogProvider>
    </DataProvider>
  );
}
