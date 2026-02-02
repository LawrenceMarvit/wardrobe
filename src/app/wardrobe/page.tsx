import Link from "next/link";
import { getMyItems } from "@/lib/wardrobeApi";

export default async function WardrobePage() {
  const items = await getMyItems();

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Wardrobe</h1>

      <Link href="/add-item">
        <button style={{ marginTop: 12, marginBottom: 24 }}>
          + Add Item
        </button>
      </Link>

      {items.map((item) => (
        <Link key={item.id} href={`/wardrobe/${item.id}`}>
          <div
            style={{
              border: "1px solid #333",
              borderRadius: 12,
              padding: 14,
              marginBottom: 16,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              {item.title}
            </div>

            <div style={{ opacity: 0.8 }}>
              Category: <b>{item.category}</b> · Confidence:{" "}
              <b>{item.confidence}</b>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
