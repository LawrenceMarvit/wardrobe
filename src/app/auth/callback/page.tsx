"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function run() {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        router.replace("/login");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        router.replace("/login");
        return;
      }

      router.replace("/wardrobe");
    }

    run();
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      Logging you in…
    </div>
  );
}
