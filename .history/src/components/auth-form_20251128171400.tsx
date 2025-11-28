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
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const REGISTRATION_CODE = "CLOVER2024"; // Código para registrarse

  const username = email.split("@")[0];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.register({
        username,
        email,
        password,
        code,
      });
      return response;
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      setError(error.response);
    }

    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    // Simular login (en un caso real, esto iría a un backend)
    try {
      const users = JSON.parse(localStorage.getItem("clover_users") || "[]");
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!user) {
        setError("Email o contraseña incorrectos");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "clover_auth",
        JSON.stringify({ email, timestamp: new Date() })
      );
      router.push("/");
    } catch (err) {
      setError("Error al iniciar sesión. Intenta de nuevo");
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
          <CardTitle>
            {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Accede a tu cuenta de Clover Studio"
              : "Crea una nueva cuenta con un código de registro"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={mode === "login" ? handleLogin : handleRegister}
            className="space-y-4"
          >
            {error && (
              <div
                className={`p-3 rounded-md text-sm ${
                  error.includes("exitoso")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
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
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {mode === "register" && (
              <div>
                <Label htmlFor="code">Código de Registro</Label>
                <Input
                  id="code"
                  placeholder="Ingresa el código"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Solicita el código al administrador
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Procesando..."
                : mode === "login"
                ? "Iniciar Sesión"
                : "Registrarse"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
                setEmail("");
                setPassword("");
                setCode("");
              }}
              className="text-sm text-primary hover:underline"
            >
              {mode === "login"
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </CardContent>
      </Card>

      {mode === "register" && (
        <p className="text-xs text-center text-muted-foreground">
          💡 Código de demo:{" "}
          <span className="font-mono font-semibold">CLOVER2024</span>
        </p>
      )}
    </div>
  );
}
