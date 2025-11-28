"use client";

import { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserProfile() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("clover_auth");
    if (auth) {
      const parsed = JSON.parse(auth);
      setEmail(parsed.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("clover_auth");
    router.push("/auth");
  };

  const getInitials = (email: string) => {
    if (!email) return "CS";
    return email
      .split("@")[0]
      .split(".")
      .map((part) => part[0]?.toUpperCase())
      .filter(Boolean)
      .join("")
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-card transition-colors">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getInitials(email) || "CS"}
            </AvatarFallback>
          </Avatar>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">
              {email ? email.split("@")[0] : "Usuario"}
            </p>
            <p className="text-xs text-muted-foreground">
              {email || "No autenticado"}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <User className="mr-2 h-4 w-4" />
          <span>{email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
