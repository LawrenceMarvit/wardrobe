"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadItems, clearItems, WardrobeItem } from "@/lib/wardrobeStore";

export default function WardrobePage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);

  useEffect(() => {
    setItems(loadItems());
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold">Your wardrobe</h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                clearItems();
                setItems([]);
              }}
              className="px-3 py-2 border rounded-xl"
            >
              Clear all
            </button>
            <Link
              href="/add-item"
              className="px-4 py-2 bg-white text-black rounded-xl"
            >
              + Add item
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/wardrobe/${item.id}`}
              className="block p-4 rounded-xl bg-neutral-900"
            >
              {item.title} · {item.category}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
