"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Dashboard />
    </div>
  );
}
