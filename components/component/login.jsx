"use client";

/**
 * Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
 **/
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import auth from '../../api/auth';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetchLogin(username, password);
  };

  const fetchLogin = async (username, password) => {
    try {
      const response = await auth.login(username, password);
      console.log(response.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Đăng nhập</CardTitle>
        <CardDescription>Nhập tên người dùng và mật khẩu của bạn để đăng nhập vào hệ thống.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Tên người dùng</Label>
          <Input 
            id="username" 
            type="text"
            placeholder="Nhập tên người dùng" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Nhập mật khẩu" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleLogin}>Đăng nhập</Button>
      </CardFooter>
    </Card>
  );
}
