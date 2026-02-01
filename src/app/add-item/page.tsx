"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addItem, Confidence } from "@/lib/wardrobeStore";

export default function AddItemPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [confidence, setConfidence] = useState<Confidence>("Likely");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoanable, setIsLoanable] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const canSave = useMemo(() => {
    return title.trim().length > 0 && category.trim().length > 0;
  }, [title, category]);

  function onSave() {
    setError(null);

    if (!canSave) {
      setError("Please add a title and category.");
      return;
    }

    addItem({
      title: title.trim(),
      category: category.trim(),
      confidence,
      isPublic,
      isLoanable,
    });

    router.push("/wardrobe");
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-md px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Add an item</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Add basics first. Photos + AI come next.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl bg-neutral-900 p-5 shadow">
          <div>
            <label className="text-sm text-neutral-300">Title</label>
            <input
              className="mt-2 w-full rounded-xl bg-neutral-800 px-4 py-3 text-sm outline-none ring-1 ring-neutral-700 focus:ring-2"
              placeholder="e.g. Vintage jacket"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Category</label>
            <input
              className="mt-2 w-full rounded-xl bg-neutral-800 px-4 py-3 text-sm outline-none ring-1 ring-neutral-700 focus:ring-2"
              placeholder="e.g. Outerwear"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Confidence</label>
            <select
              className="mt-2 w-full rounded-xl bg-neutral-800 px-4 py-3 text-sm outline-none ring-1 ring-neutral-700 focus:ring-2"
              value={confidence}
              onChange={(e) => setConfidence(e.target.value as Confidence)}
            >
              <option value="Likely">Likely</option>
              <option value="Speculative">Speculative</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-neutral-800 px-4 py-3 ring-1 ring-neutral-700">
            <div>
              <div className="text-sm font-medium">Public</div>
              <div className="text-xs text-neutral-400">Visible to others</div>
            </div>
            <button
              type="button"
              onClick={() => setIsPublic((v) => !v)}
              className={`h-7 w-12 rounded-full p-1 transition ${
                isPublic ? "bg-white" : "bg-neutral-700"
              }`}
              aria-pressed={isPublic}
            >
              <div
                className={`h-5 w-5 rounded-full transition ${
                  isPublic ? "translate-x-5 bg-neutral-950" : "translate-x-0 bg-white"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-neutral-800 px-4 py-3 ring-1 ring-neutral-700">
            <div>
              <div className="text-sm font-medium">Loanable</div>
              <div className="text-xs text-neutral-400">Okay to lend</div>
            </div>
            <button
              type="button"
              onClick={() => setIsLoanable((v) => !v)}
              className={`h-7 w-12 rounded-full p-1 transition ${
                isLoanable ? "bg-white" : "bg-neutral-700"
              }`}
              aria-pressed={isLoanable}
            >
              <div
                className={`h-5 w-5 rounded-full transition ${
                  isLoanable ? "translate-x-5 bg-neutral-950" : "translate-x-0 bg-white"
                }`}
              />
            </button>
          </div>

          {error && (
            <div className="rounded-xl bg-red-950/40 px-4 py-3 text-sm text-red-200 ring-1 ring-red-900">
              {error}
            </div>
          )}

          <div className="pt-2 space-y-3">
            <button
              onClick={onSave}
              disabled={!canSave}
              className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition ${
                canSave
                  ? "bg-white text-neutral-950"
                  : "bg-neutral-700 text-neutral-300 cursor-not-allowed"
              }`}
            >
              Save item
            </button>

            <button
              onClick={() => router.push("/wardrobe")}
              className="w-full rounded-xl bg-neutral-800 px-4 py-3 text-sm text-neutral-200 ring-1 ring-neutral-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
