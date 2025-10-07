"use client";
import { useState } from "react";
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
import { config } from "@/config";

export default function LoginPage() {
  // 跳转到 GitHub OAuth2 授权页面
  const handleGithubLogin = () => {
    const githubAuthUrl = config.rootUrl + `/oauth2/authorization/github`;
    window.location.href = githubAuthUrl;
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${config.apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        setError("用户名或密码错误");
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        window.location.href = "/";
      } else {
        setError("登录失败");
      }
    } catch (err) {
      setError("网络错误");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm mx-auto mt-24">
        <CardHeader>
          <CardTitle>登录 Orinote</CardTitle>
          <CardDescription>
            输入您的用户名及密码以登录您的账户
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
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
              <Input id="password" name="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "登录中..." : "登录"}</Button>
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
            variant="outline"
            className="w-full"
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
