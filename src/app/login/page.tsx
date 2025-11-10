"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import authService from "@/api/auth";

export default function LoginPage() {
  const handleOauth2Login = async () => {
    try {
      await authService.login();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
      <Card className="w-full max-w-sm mx-auto mt-24">
        <CardHeader>
          <CardTitle>登录 Orinote</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleOauth2Login}
          >
            使用 OAuth2 登录
          </Button>
        </CardContent>
      </Card>
  );
}
