"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import authService from "@/api/auth";

export default function LoginCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      try {
        // 调用 signinCallback() 处理重定向回来的授权码
        const user = await authService.loginCallback();
        console.log('Access token:', user?.access_token);
        console.log('Refresh token:', user?.refresh_token);
        console.log('ID token:', user?.id_token);
        console.log('Profile:', user?.profile);

        // 登录完成后跳转首页
        router.replace('/');
      } catch (err) {
        console.error('Callback error:', err);
      }
    }

    handleCallback();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-lg font-semibold mb-2">正在登录...</div>
      <div className="text-sm text-muted-foreground">请稍候，正在跳转</div>
    </div>
  );
}
