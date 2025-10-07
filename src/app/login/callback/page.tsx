"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginCallback() {
  const router = useRouter();

  useEffect(() => {
    // 解析 jwt 参数
    const params = new URLSearchParams(window.location.search);
    const jwt = params.get("jwt");
    if (jwt) {
      localStorage.setItem("jwt", jwt);
      // 跳转到首页
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-lg font-semibold mb-2">正在登录...</div>
      <div className="text-sm text-muted-foreground">请稍候，正在跳转</div>
    </div>
  );
}
