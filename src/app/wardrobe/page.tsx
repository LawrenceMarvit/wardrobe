"use client";
import Link from "next/link";
import { getMyItems } from "@/lib/wardrobeApi";

export default async function WardrobePage() {
  const items = await getMyItems();

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 42, fontWeight: 900, marginBottom: 16 }}>
        Wardrobe
      </h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <Link
          href="/add-item"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            border: "1px solid #333",
            borderRadius: 12,
            textDecoration: "none",
            color: "white",
          }}
        >
          + Add Item
        </Link>

        <Link
          href="/login"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            border: "1px solid #333",
            borderRadius: 12,
            textDecoration: "none",
            color: "white",
            opacity: 0.9,
          }}
        >
          Login
        </Link>
      </div>

      {items.length === 0 ? (
        <div style={{ opacity: 0.8 }}>No items yet.</div>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/wardrobe/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid #333",
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>
                      {item.title}
                    </div>
                    <div style={{ opacity: 0.8 }}>
                      Category: <b>{item.category}</b> · Confidence:{" "}
                      <b>{item.confidence}</b>
                    </div>
                  </div>

                  <div style={{ textAlign: "right", opacity: 0.75 }}>
                    <div style={{ fontSize: 12 }}>
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                    <div style={{ fontSize: 12 }}>
                      Public: <b>{item.is_public ? "Yes" : "No"}</b> · Loanable:{" "}
                      <b>{item.is_loanable ? "Yes" : "No"}</b>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12 }}>
                  ID: {item.id}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
