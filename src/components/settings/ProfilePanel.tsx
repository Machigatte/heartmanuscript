import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { IconBrandGithub } from "@tabler/icons-react";

export function ProfilePanel() {
  const [username, setUsername] = React.useState("orinote");
  const [email, setEmail] = React.useState("example@email.com");

  return (
    <div className="flex flex-col gap-4 pt-4">
      {/* OAuth2 关联/解绑 图标 描述 关联按钮 */}
      <div className="grid gap-2">
        <Label>第三方账号关联</Label>
        <div className="flex flex-col sm:flex-row gap-2">
          {/* GitHub */}
          <div className="flex-1 p-4 border rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconBrandGithub className="w-6 h-6 text-gray-600" />
              <div>
                <div className="font-medium">GitHub</div>
                <div className="text-sm text-gray-500">
                  {username ? `已关联为 ${username}` : "未关联"}
                </div>
              </div>
            </div>
            <Button
              variant={username ? "outline" : "default"}
              size="sm"
              onClick={() => {
                if (username) {
                  // 解绑逻辑
                  setUsername("");
                } else {
                  // 跳转到 GitHub OAuth2 授权页面
                  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
                  const redirectUri = typeof window !== "undefined" ? window.location.origin + "/api/auth/callback" : "";
                  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
                  window.location.href = githubAuthUrl;
                }
              }}
            >
              {username ? "解绑" : "关联"}
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* 邮箱 */}
      <div className="grid gap-2">
        <Label htmlFor="email">电子邮箱</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="请输入邮箱"
        />
      </div>
    </div>
  );
}
