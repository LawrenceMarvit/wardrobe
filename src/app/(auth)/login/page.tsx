"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const redirectTo = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (!error) setSent(true);
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      {sent ? (
        <p>Check your email for the login link.</p>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: 8, marginRight: 8 }}
          />
          <button type="submit">Send Magic Link</button>
        </form>
      )}
    </div>
  );
}
