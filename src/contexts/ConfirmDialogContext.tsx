"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface ConfirmDialogOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ConfirmDialogContextType {
  open: boolean;
  options: ConfirmDialogOptions;
  show: (options: ConfirmDialogOptions) => void;
  hide: () => void;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export function useConfirmDialog() {
  const ctx = useContext(ConfirmDialogContext);
  if (!ctx) throw new Error("useConfirmDialog must be used within ConfirmDialogProvider");
  return ctx;
}

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>({});

  const show = useCallback((opts: ConfirmDialogOptions) => {
    setOptions(opts);
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  const value: ConfirmDialogContextType = {
    open,
    options,
    show,
    hide,
  };

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}
    </ConfirmDialogContext.Provider>
  );
}
