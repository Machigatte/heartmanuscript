import { Frown } from "lucide-react"; // 确保您已安装 lucide-react

/**
 * 符合 shadcn/ui 风格的简洁错误页面组件
 */
export default function EditorError({
  title = "页面走失了",
  message = "我们找不到您请求的页面。可能是链接错误或页面已被移除。",
}) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      {/* 核心内容容器：垂直堆叠，居中对齐 */}
      <div className="text-center space-y-6 max-w-lg mx-auto">
        
        {/* 1. 图标/视觉焦点和错误代码 */}
        <div className="flex flex-col items-center justify-center space-y-4">
          
          {/* 图标：使用主题色或强调色 */}
          <Frown className="h-16 w-16 text-primary md:h-20 md:w-20 animate-pulse" /> 
        </div>

        {/* 2. 标题和信息 */}
        <div className="space-y-3"> 
          {/* 标题 */}
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          
          {/* 描述信息：使用 text-muted-foreground 保持柔和 */}
          <p className="text-muted-foreground text-sm md:text-base">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}