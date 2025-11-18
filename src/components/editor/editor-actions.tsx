import React from "react";

interface EditorActionsProps {
  children: React.ReactNode; // 用于插入 Action 组件和内容
}

export const EditorActions: React.FC<EditorActionsProps> = ({ children }) => {
  return (
    <footer className="h-16 border-t flex items-center justify-end px-4 bg-gray-50">
      <div className="flex gap-3">
        {children}
      </div>
    </footer>
  );
};
