"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { insertItem, type Confidence } from "@/lib/wardrobeApi";

export default function AddItemPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [confidence, setConfidence] = useState<Confidence>("medium");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoanable, setIsLoanable] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const created = await insertItem({
        title: title.trim(),
        category: category.trim(),
        confidence,
        // ✅ MUST MATCH DATABASE COLUMN NAMES:
        is_public: isPublic,
        is_loanable: isLoanable,
      });

      // Go to details page for the created item
      router.push(`/wardrobe/${created.id}`);
    } catch (err: any) {
      setError(err?.message ?? "Failed to add item");
      console.error("Insert failed:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 40, fontWeight: 900, marginBottom: 24 }}>Add Item</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Title</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. red t shirt"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #333",
              background: "transparent",
              color: "white",
            }}
          />
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Category</div>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. shirt"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #333",
              background: "transparent",
              color: "white",
            }}
          />
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Confidence</div>
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value as Confidence)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #333",
              background: "transparent",
              color: "white",
            }}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <span>Public</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="checkbox"
            checked={isLoanable}
            onChange={(e) => setIsLoanable(e.target.checked)}
          />
          <span>Loanable</span>
        </label>

        {error && (
          <div
            style={{
              background: "rgba(255,0,0,0.12)",
              border: "1px solid rgba(255,0,0,0.35)",
              padding: 12,
              borderRadius: 10,
              color: "#ff6b6b",
              whiteSpace: "pre-wrap",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "14px 16px",
            borderRadius: 12,
            border: "1px solid #333",
            background: "transparent",
            color: "white",
            fontSize: 18,
            fontWeight: 800,
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.6 : 1,
            marginTop: 6,
          }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
