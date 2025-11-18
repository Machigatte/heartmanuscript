import { useEffect } from 'react';

/**
 * 监听 isDirty 状态，当为 true 时，阻止用户意外关闭或刷新浏览器窗口。
 * @param isDirty - 当前数据是否有未保存的更改
 */
export const usePreventWindowUnload = (isDirty: boolean) => {
  useEffect(() => {
    if (isDirty) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault(); 
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isDirty]);
};
