"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/wardrobe`
          : "http://localhost:3000/wardrobe";

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) throw error;

      setStatus("✅ Login link sent. Check your email (and spam folder).");
    } catch (err: any) {
      // This is the IMPORTANT part: it will reveal why it isn't sending
      setStatus(`❌ ${err?.message ?? "Failed to send login link"}`);
      console.error("Magic link error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <form onSubmit={sendMagicLink} style={{ width: 420, maxWidth: "100%" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Welcome back</h1>
        <p style={{ opacity: 0.7, marginBottom: 18 }}>We’ll email you a secure sign-in link.</p>

        <label style={{ display: "block", marginBottom: 8 }}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          type="email"
          required
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #333",
            background: "#111",
            color: "white",
            marginBottom: 12,
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #333",
            background: "white",
            color: "black",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Send me a login link"}
        </button>

        {status && (
          <div style={{ marginTop: 14, padding: 12, borderRadius: 10, border: "1px solid #333" }}>
            {status}
          </div>
        )}
      </form>
    </div>
  );
}
