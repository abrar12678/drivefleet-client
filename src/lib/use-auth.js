"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    let retries = 0;
    const maxRetries = 3;

    async function checkSession() {
      try {
        const res = await fetch("/api/auth/get-session", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        console.log("[AUTH DEBUG] get-session status:", res.status);
        console.log("[AUTH DEBUG] get-session response:", JSON.stringify(data));

        if (!cancelled) {
          if (data?.data?.user) {
            console.log("[AUTH DEBUG] User found:", data.data.user.email);
            setUser(data.data.user);
          } else {
            console.log(
              "[AUTH DEBUG] No user in session. data is:",
              data?.data,
            );
            // Retry if no session found (cookies might not be set yet)
            if (retries < maxRetries) {
              retries++;
              console.log("[AUTH DEBUG] Retrying... attempt", retries);
              setTimeout(checkSession, 1000);
              return;
            }
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("[AUTH DEBUG] Session check error:", err);
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
      console.log("[AUTH DEBUG] No user after loading, redirecting to sign-in");
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  return { user, loading };
}
