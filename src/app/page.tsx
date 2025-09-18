"use client";
import { Sidebar } from "@/components/Sidebar";
import { RecordEditor } from "@/containers/RecordEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function RecordInterface() {
  return (
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
  );
}
