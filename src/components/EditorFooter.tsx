import { Button } from "./ui/button";

export function EditorFooter() {
  return (
    <footer className="h-16 border-t flex items-center justify-between px-4 bg-gray-50">
      <div /> {/* 占位左侧 */}
      {/* 右侧三个功能按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">保存</Button>
        <Button variant="outline">分析</Button>
        <Button variant="default">归档</Button>
      </div>
    </footer>
  );
}