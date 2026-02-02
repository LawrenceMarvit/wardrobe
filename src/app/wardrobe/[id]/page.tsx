import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type WardrobeItem = {
  id: string;
  title: string;
  category: string;
  confidence: string;
  is_public: boolean;
  is_loanable: boolean;
  created_at: string;
};

type ParamsMaybePromise = { id?: string } | Promise<{ id?: string }>;

export default async function WardrobeItemPage(props: { params: ParamsMaybePromise }) {
  // Next.js versions differ: params may be an object OR a Promise
  const params = await props.params;
  const rawId = params?.id;

  if (!rawId) {
    return (
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <Link href="/wardrobe" style={{ textDecoration: "none" }}>
          ← Back
        </Link>
        <h1 style={{ marginTop: 16 }}>Item not found</h1>
        <pre style={{ whiteSpace: "pre-wrap", color: "crimson" }}>
          {JSON.stringify({ message: "Route param 'id' was missing", params }, null, 2)}
        </pre>
      </div>
    );
  }

  const id = decodeURIComponent(rawId);

  const { data, error } = await supabase
    .from("wardrobe_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return (
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <Link href="/wardrobe" style={{ textDecoration: "none" }}>
          ← Back
        </Link>

        <h1 style={{ marginTop: 16 }}>Item not found</h1>

        <pre style={{ whiteSpace: "pre-wrap", color: "crimson" }}>
          {JSON.stringify(error, null, 2)}
        </pre>

        <div style={{ marginTop: 12, opacity: 0.8 }}>
          Tried to load item id: <b>{id}</b>
        </div>
      </div>
    );
  }

  const item = data as WardrobeItem;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Link href="/wardrobe" style={{ textDecoration: "none" }}>
        ← Back
      </Link>

      <h1 style={{ fontSize: 42, fontWeight: 900, marginTop: 16 }}>
        {item.title}
      </h1>

      <div
        style={{
          marginTop: 18,
          border: "1px solid #333",
          borderRadius: 12,
          padding: 16,
          display: "grid",
          gap: 10,
        }}
      >
        <div>
          <b>Category:</b> {item.category}
        </div>
        <div>
          <b>Confidence:</b> {item.confidence}
        </div>
        <div>
          <b>Public:</b> {item.is_public ? "Yes" : "No"}
        </div>
        <div>
          <b>Loanable:</b> {item.is_loanable ? "Yes" : "No"}
        </div>
        <div>
          <b>Created:</b> {new Date(item.created_at).toLocaleString()}
        </div>
        <div style={{ fontSize: 12, opacity: 0.75 }}>
          <b>ID:</b> {item.id}
        </div>
      </div>
    </div>
  );
}
