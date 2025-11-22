import React, { useRef, useEffect } from 'react';

interface AutoResizeTextareaProps {
  // 保持 value 为可选 (?)
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
}

export function AutoResizeTextarea({
  value = '', // 关键修改 1: 为 value 提供默认值 ''
  onChange,
  readOnly,
  className,
  placeholder,
  minHeight = 60,
  maxHeight
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevLineCount = useRef(0);
  
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 关键修改 2: 因为 value 现在始终是 string (默认为''), 所以可以安全调用 split
    const lineCount = value.split('\n').length;
    
    // 原始逻辑保持不变
    if (lineCount !== prevLineCount.current) {
      // 1. 重置高度为 'auto'，获取准确的 scrollHeight
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      
      let newHeight = Math.max(minHeight, scrollHeight + 10); // +10 for padding/border
      
      if (typeof maxHeight === 'number') {
        newHeight = Math.min(newHeight, maxHeight);
      }
      
      // 2. 设置新的高度
      textarea.style.height = `${newHeight}px`;
      prevLineCount.current = lineCount;
    }
    
    // 如果 value 发生变化但行数不变 (比如在同一行输入)，我们仍然希望执行一次 resize 逻辑
    // 以处理字体或内容变化引起的微小高度调整。
    // 但是为了优化性能，您当前的逻辑只在行数变化时才调整高度，这是可以接受的。
    // 如果需要更严格的自适应，可以移除 if (lineCount !== prevLineCount.current) 判断。
    
  }, [value, minHeight, maxHeight]); // 依赖项保持不变

  return (
    <textarea
      ref={textareaRef}
      className={className}
      value={value} // 渲染时使用经过默认值处理的 value
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      style={{
        // 建议：组件内部 props 提供的 minHeight/maxHeight 应该覆盖 style 中的固定值
        // 移除 style 属性中冲突的 minHeight/maxHeight，或改为使用变量：
        overflow: 'auto',
        minHeight: `${minHeight}px`,
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : '70vh' // 确保这里使用的单位一致
      }}
    />
  );
}