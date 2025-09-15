"use client";
import { useConfirmDialog } from "@/contexts/ConfirmDialogContext";
import { ConfirmDialog } from "@/components/ConfirmDialog";

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