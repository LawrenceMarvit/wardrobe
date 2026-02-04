// ============================================
// FILE A: REPLACE ENTIRE FILE
// src/app/add-item/page.tsx
// ============================================

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function AddItemPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [confidence, setConfidence] = useState("low");
  const [isPublic, setIsPublic] = useState(true);
  const [isLoanable, setIsLoanable] = useState(true);

  const [msg, setMsg] = useState<string>("");
  const [saving, setSaving] = useState(false);

  async function onSave() {
    setMsg("");
    setSaving(true);

    try {
      const { data: sessionData, error: sessErr } = await supabase.auth.getSession();
      if (sessErr) throw sessErr;

      const userId = sessionData.session?.user?.id;
      if (!userId) {
        setMsg("Not logged in. Go back and log in first.");
        setSaving(false);
        return;
      }

      const payload: any = {
        name: name.trim(),
        category: category.trim(),
        confidence,
        is_public: isPublic,
        is_loanable: isLoanable,
        user_id: userId, // if your table doesn't have this column, Supabase will error and we'll show it
      };

      const { error: insertErr } = await supabase.from("wardrobe_items").insert(payload);
      if (insertErr) throw insertErr;

      // IMPORTANT: stop redirecting to /wardrobe/[id] (that's what was causing "Item not found")
      router.replace("/wardrobe");
      router.refresh();
    } catch (e: any) {
      setMsg(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 760, margin: "0 auto" }}>
      <a href="/wardrobe" style={{ textDecoration: "none", opacity: 0.85 }}>
        ← Back
      </a>

      <h1 style={{ fontSize: 48, margin: "16px 0 18px" }}>Add Item</h1>

      <div style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <div>Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Blue Jacket"
            style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "inherit" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Category</div>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Outerwear"
            style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "inherit" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <div>Confidence</div>
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.25)", background: "black", color: "inherit" }}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
          Public
        </label>

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="checkbox" checked={isLoanable} onChange={(e) => setIsLoanable(e.target.checked)} />
          Loanable
        </label>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          style={{
            marginTop: 8,
            padding: "12px 16px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "inherit",
            cursor: saving ? "default" : "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Item"}
        </button>

        {msg && (
          <div style={{ padding: 12, border: "1px solid rgba(255,100,100,0.8)", borderRadius: 12 }}>
            {msg}
          </div>
        )}
      </div>
    </main>
  );
}
