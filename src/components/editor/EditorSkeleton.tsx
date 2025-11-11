import { Skeleton } from "@/components/ui/skeleton"; // 确保您已导入 shadcn/ui 的 Skeleton 组件

/**
 * 模拟笔记软件加载状态的骨架屏
 */
export default function EditorSkeleton() {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-pulse">
      {/* 1. 顶部导航/标题区域 */}
      <div className="flex items-center justify-between">
        {/* 左侧：笔记标题占位符 */}
        <Skeleton className="h-8 w-1/3 max-w-[200px] rounded-md" /> 
        
        {/* 右侧：三个小按钮占位符 */}
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8 rounded-md" /> 
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      {/* 2. 笔记内容区域 - 第一段 */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-full rounded-md" /> {/* 全宽行 */}
        <Skeleton className="h-5 w-[90%] rounded-md" />
        <Skeleton className="h-5 w-[95%] rounded-md" />
        <Skeleton className="h-5 w-[80%] rounded-md" />
      </div>

      {/* 3. 笔记内容区域 - 第二段 */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-[85%] rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-[70%] rounded-md" />
      </div>

      {/* 4. 笔记内容区域 - 第三段 */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-[92%] rounded-md" />
      </div>
    </div>
  );
}