import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function WardrobePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pull items for this user (if you have RLS, this will naturally filter)
  const { data: items } = await supabase
    .from("wardrobe_items")
    .select("id, name, category, confidence, is_public, is_loanable, created_at")
    .order("created_at", { ascending: false });

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 64, margin: "0 0 16px 0" }}>Wardrobe</h1>

      <div style={{ marginBottom: 18, fontSize: 20 }}>
        {user ? (
          <>Logged in as <b>{user.email}</b></>
        ) : (
          <>Not logged in</>
        )}
      </div>

      {/* REAL LINK (not a button router push) */}
      <div style={{ margin: "18px 0 28px 0" }}>
        <Link
          href="/add-item"
          style={{
            display: "inline-block",
            fontSize: 26,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          + Add Item
        </Link>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {(items ?? []).map((item) => (
          <Link
            key={item.id}
            href={`/wardrobe/${item.id}`}
            style={{
              display: "block",
              padding: 14,
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 600 }}>{item.name}</div>
            <div style={{ opacity: 0.8 }}>
              {item.category ?? "—"} • {item.confidence ?? "—"}
              {item.is_public ? " • public" : ""}{item.is_loanable ? " • loanable" : ""}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
