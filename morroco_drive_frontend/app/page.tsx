"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/utils/store/store";

export default function HomePage() {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const role = useAppSelector((state) => state.auth.role);

  useEffect(() => {
    // Redirect logic based on token and role
    if (!token || token === "" || role === null) {
      router.replace("/auth"); // Redirect to Auth page
    } else if (role === "NORMAL_USER") {
      router.replace("/profile"); // Redirect to Profile page for normal users
    } else if (role === "DRIVER") {
      router.replace("/driver/dashboard"); // Redirect to Driver Dashboard
    }
  }, [router, token, role]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-700">Redirecting...</p>
    </div>
  ); // Loader or placeholder while redirecting
}
