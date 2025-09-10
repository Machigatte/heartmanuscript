import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      <h2 className="text-lg font-semibold p-4">历史记录</h2>

      {/* 列表 + 按钮容器 */}
      <div className="flex flex-col flex-1 overflow-y-auto justify-between p-4">
        {/* 上面列表 */}
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 cursor-pointer hover:text-black">2025-09-01 周报</li>
          <li className="text-sm text-gray-600 cursor-pointer hover:text-black">2025-09-05 科研日记</li>
        </ul>

        {/* 左侧设置按钮，固定在底部 */}
        <Button variant="ghost" className="self-start">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </aside>
  );
}
