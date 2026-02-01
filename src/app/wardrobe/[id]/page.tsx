"use client";

import { useParams, useRouter } from "next/navigation";
import { getItemById, deleteItem } from "@/lib/wardrobeStore";

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const item = getItemById(id);

  if (!item) {
    return <div className="p-6">Item not found</div>;
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6">
      <button onClick={() => router.back()} className="mb-4">
        ← Back
      </button>

      <h1 className="text-2xl mb-6">{item.title}</h1>

      <button
        onClick={() => {
          deleteItem(id);
          router.push("/wardrobe");
        }}
        className="px-4 py-2 bg-red-600 rounded-xl"
      >
        Delete this item
      </button>
    </main>
  );
}
