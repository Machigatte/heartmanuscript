"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IconBrandGithub } from "@tabler/icons-react";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function LoginPage() {
  // 跳转到 GitHub OAuth2 授权页面
  const handleGithubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = typeof window !== "undefined" ? window.location.origin + "/api/auth/callback" : "";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;
    window.location.href = githubAuthUrl;
  };

  return (
    <form action="/login" method="post">
      <Card className="w-full max-w-sm mx-auto mt-24">
        <CardHeader>
          <CardTitle>登录 Orinote</CardTitle>
          <CardDescription>
            输入您的用户名及密码以登录您的账户
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">密码</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  忘记密码？
                </a>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            登录
          </Button>
          <div className="flex items-center w-full gap-3 mt-2 mb-2">
            <Separator className="flex-1" />
            <div className="text-sm text-muted-foreground">或者</div>
            <Separator className="flex-1" />
          </div>
          <Button variant="outline" className="w-full">
            <IconBrandGoogle />
            使用 Google 登录
          </Button>
          <Button
            variant="outline" className="w-full"
            onClick={handleGithubLogin}
          >
            <IconBrandGithub />
            使用 GitHub 登录
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
