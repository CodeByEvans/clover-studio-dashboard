"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  return (
    <div className="p-8">
      <Dashboard />
    </div>
  );
}
