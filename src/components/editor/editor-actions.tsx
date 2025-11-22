import React from "react";

interface EditorActionsProps {
  children: React.ReactNode;
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
