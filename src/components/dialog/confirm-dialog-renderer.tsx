"use client";
import { useConfirmDialog } from "@/components/dialog/confirm-dialog-context";
import { ConfirmDialog } from "./confirm-dialog";

export default function ConfirmDialogRenderer() {
  const { open, options, hide } = useConfirmDialog();
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={open => !open && hide()}
      title={options.title}
      description={options.description}
      confirmText={options.confirmText}
      cancelText={options.cancelText}
      onConfirm={() => {
        if (options.onConfirm) options.onConfirm();
      }}
      onCancel={() => {
        if (options.onCancel) options.onCancel();
      }}
    />
  );
}