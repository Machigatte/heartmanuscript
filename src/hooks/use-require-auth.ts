"use client";

import authService from "@/api/auth";
import { useEffect, useState } from "react";

export function useRequireAuth() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkUser() {
      const user = await authService.getUser();
      if (cancelled) return;

      if (!user) {
        // 未登录，跳转到授权页
        authService.login();
      } else {
        // 已登录，继续渲染
        setLoading(false);
      }
    }

    checkUser();

    return () => {
      cancelled = true;
    };
  }, []);

  return loading;
}
