"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getItemById, type ClothingItem } from "@/lib/wardrobeStore";

export default function WardrobeItemPage() {
  const params = useParams<{ id: string }>();
  const id = useMemo(
    () => (params?.id ? decodeURIComponent(params.id) : ""),
    [params]
  );

  const [item, setItem] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error("Missing item id in route.");
        }

        const found = await getItemById(id);

        if (!cancelled) {
          setItem(found ?? null);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? "Failed to load item.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Link href="/wardrobe" style={{ textDecoration: "none" }}>
        ← Back
      </Link>

      {loading && <p style={{ marginTop: 16 }}>Loading…</p>}

      {!loading && error && (
        <p style={{ marginTop: 16, color: "crimson" }}>{error}</p>
      )}

      {!loading && !error && !item && (
        <p style={{ marginTop: 16 }}>Item not found.</p>
      )}

      {!loading && !error && item && (
        <>
          <h1 style={{ marginTop: 16 }}>Item</h1>
          <div style={{ marginTop: 12 }}>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(item, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}
