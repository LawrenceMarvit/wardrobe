"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addItem } from "@/lib/wardrobeStore";

type Confidence = "low" | "medium" | "high";

export default function AddItemPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [confidence, setConfidence] = useState<Confidence>("medium");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoanable, setIsLoanable] = useState(false);

  const isValid = useMemo(() => {
    return title.trim().length > 0 && category.trim().length > 0;
  }, [title, category]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    await addItem({
      title: title.trim(),
      category: category.trim(),
      confidence,
      is_public: isPublic,
      is_loanable: isLoanable,
    });

    router.push("/wardrobe");
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        Add item
      </h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Black hoodie"
            style={{ padding: 10, borderRadius: 8, border: "1px solid #333" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Category</span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Tops"
            style={{ padding: 10, borderRadius: 8, border: "1px solid #333" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Confidence</span>
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value as Confidence)}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #333" }}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <span>Public</span>
        </label>

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={isLoanable}
            onChange={(e) => setIsLoanable(e.target.checked)}
          />
          <span>Loanable</span>
        </label>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #333",
            cursor: isValid ? "pointer" : "not-allowed",
            opacity: isValid ? 1 : 0.6,
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
