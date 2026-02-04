"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function WardrobePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <main style={{ padding: 40, color: "white" }}>
      <h1 style={{ fontSize: 48, marginBottom: 20 }}>Wardrobe</h1>

      {!user ? (
        <button style={{ padding: 12, fontSize: 18 }}>Login</button>
      ) : (
        <div style={{ marginBottom: 20 }}>
          Logged in as <strong>{user.email}</strong>
        </div>
      )}

      <button style={{ padding: 12, fontSize: 18, marginRight: 10 }}>
        + Add Item
      </button>
    </main>
  );
}
