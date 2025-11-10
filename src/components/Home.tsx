import { FilePlus } from "lucide-react"; 
import { Button } from "@/components/ui/button"; 

interface HomeProps {
  onCreateNew: () => void;
};

export function Home({ onCreateNew }: HomeProps) {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      {/* 核心内容容器：文本居中，垂直堆叠 */}
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        
        {/* 1. 标题 */}
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          欢迎使用您的个人笔记空间
        </h1>
        
        {/* 2. 描述 */}
        <p className="text-muted-foreground text-lg">
          从这里开始您的思考和创作。<br />
          您可以选择开始一篇新的笔记，或者打开一篇旧的。
        </p>
        
        {/* 3. 行动按钮 */}
        <div className="pt-8 space-y-4 md:space-y-0 md:flex md:space-x-4 justify-center">
          
          {/* 按钮 1: 创建新笔记 (Primary 强调) */}
          <Button 
            onClick={onCreateNew} 
            className="w-full md:w-auto h-10 text-base"
          >
            <FilePlus className="mr-2 h-4 w-4" /> 
            创建新笔记
          </Button>
        </div>
        
      </div>
    </div>
  );
}
