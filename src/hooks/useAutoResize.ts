import { useEffect, useRef } from 'react';

interface UseAutoResizeOptions {
  minHeight?: number;
  maxHeight?: number;
}

export function useAutoResize(value: string, options: UseAutoResizeOptions = {}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { minHeight = 60, maxHeight = 400 } = options;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate the actual content height
    textarea.style.height = 'auto';
    
    // Calculate the new height based on content
    const scrollHeight = textarea.scrollHeight;
    
    // Apply min/max constraints
    const newHeight = Math.max(minHeight, Math.min(maxHeight, scrollHeight));
    
    textarea.style.height = `${newHeight}px`;
  }, [value, minHeight, maxHeight]);

  return textareaRef;
}