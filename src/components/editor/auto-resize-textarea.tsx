import React, { useRef, useEffect } from 'react';

interface AutoResizeTextareaProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
}

export function AutoResizeTextarea({
  value,
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
    const lineCount = value.split('\n').length;
    if (lineCount !== prevLineCount.current) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      let newHeight = Math.max(minHeight, scrollHeight + 10); // +10 for padding
      if (typeof maxHeight === 'number') {
        newHeight = Math.min(newHeight, maxHeight);
      }
      textarea.style.height = `${newHeight}px`;
      prevLineCount.current = lineCount;
    }
  }, [value, minHeight, maxHeight]);

  return (
    <textarea
      ref={textareaRef}
      className={className}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      style={{
        resize: 'vertical',
        overflow: 'auto',
        minHeight: '60px',
        maxHeight: '70vh'
      }}
    />
  );
}
