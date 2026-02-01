"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addItem } from "@/lib/wardrobeStore";

export default function AddItemPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [confidence, setConfidence] = useState<"low" | "medium" | "high">("medium");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoanable, setIsLoanable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      addItem({
        title: title.trim(),
        category: category.trim(),
        confidence,
        isPublic,
        isLoanable,
      });

      router.push("/wardrobe");
    } catch (err) {
      setError("Failed to add item");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Add Item</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <select
          value={confidence}
          onChange={(e) =>
            setConfidence(e.target.value as "low" | "medium" | "high")
          }
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Public
        </label>

        <label>
          <input
            type="checkbox"
            checked={isLoanable}
            onChange={(e) => setIsLoanable(e.target.checked)}
          />
          Loanable
        </label>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
