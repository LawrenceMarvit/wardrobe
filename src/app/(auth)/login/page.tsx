"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string>("");

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createBrowserClient(url, anon);
  }, []);

  // IMPORTANT:
  // This catches OLD magic links that return tokens in the URL hash (#access_token=...).
  // With the callback route working, NEW links should use ?code=... and won’t hit this,
  // but this prevents “bounce back to /login” for older links.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const params = new URLSearchParams(hash.substring(1)); // remove '#'
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!access_token || !refresh_token) return;

    (async () => {
      setMsg("Logging you in…");
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        setMsg(`Login error: ${error.message}`);
        return;
      }

      // Clean the hash so refreshes don’t re-run it
      window.history.replaceState({}, document.title, window.location.pathname);
      router.replace("/wardrobe");
    })();
  }, [router, supabase]);

  async function sendMagicLink() {
    setMsg("Sending…");
    const redirectTo = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      setMsg(`Error: ${error.message}`);
      return;
    }

    setMsg(`Sent! Check your email. (It should go to: ${redirectTo})`);
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: 520, maxWidth: "90vw", display: "grid", gap: 12 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          style={{
            padding: "14px 12px",
            fontSize: 18,
            borderRadius: 6,
            border: "1px solid #333",
            background: "#111",
            color: "#fff",
          }}
        />
        <button
          onClick={sendMagicLink}
          style={{
            padding: "12px 12px",
            fontSize: 18,
            borderRadius: 6,
            border: "1px solid #333",
            background: "#fff",
            color: "#000",
            cursor: "pointer",
          }}
        >
          Send Magic Link
        </button>

        <div style={{ opacity: 0.85, fontSize: 16, minHeight: 24 }}>{msg}</div>
      </div>
    </div>
  );
}
