"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const res = await fetch("/api/auth/get-session", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        console.log("[AUTH DEBUG] response:", JSON.stringify(data));

        if (!cancelled) {
          if (data?.user) {
            setUser(data.user);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("[AUTH DEBUG] error:", err);
        if (!cancelled) setLoading(false);
      }
    }

    checkSession();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  return { user, loading };
}
