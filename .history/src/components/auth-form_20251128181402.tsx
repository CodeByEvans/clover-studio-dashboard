"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authAPI } from "@/services/api";

export function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      setLoading(false);
      router.push("/dashboard"); // Redirige después del login
      return response;
    } catch (error: any) {
      setError(error.data?.message || "Error al iniciar sesión");
      setTimeout(() => setError(""), 5000);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src="/logo.svg" alt="Clover Studio" className="h-48 w-auto" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Accede a tu cuenta de Clover Studio</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md text-sm bg-red-100 text-red-800">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Procesando..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
