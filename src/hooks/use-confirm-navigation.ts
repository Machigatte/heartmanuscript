import { useConfirmDialog } from "@/components/dialog/confirm-dialog-context";
import { useRouter } from "next/navigation";

export function useConfirmNavigation(isDirty: boolean) {
  const router = useRouter();
  const { show } = useConfirmDialog();

  const confirmNavigation = (path: string) => {
    if (isDirty) {
      show({
        title: "更改未保存",
        description: "确定要离开吗？如果您现在离开，您当前的信息不会被保存。",
        confirmText: "留下",
        cancelText: "离开",
        onCancel: () => router.push(path),
      });
    } else {
      router.push(path);
    }
  };

  return { confirmNavigation };
}
