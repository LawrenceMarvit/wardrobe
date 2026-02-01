export type Confidence = "low" | "medium" | "high";

export type WardrobeItem = {
  id: string;
  title: string;
  category: string;
  confidence: Confidence;
  isPublic: boolean;
  isLoanable: boolean;
  createdAt: number;
};

const STORAGE_KEY = "wardrobe_items_v1";

function makeId() {
  // Works in browser. If you ever call this on server, it falls back.
  // @ts-ignore
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function loadItems(): WardrobeItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WardrobeItem[]) : [];
  } catch {
    return [];
  }
}

export function saveItems(items: WardrobeItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addItem(input: Omit<WardrobeItem, "id" | "createdAt">): WardrobeItem {
  const items = loadItems();
  const newItem: WardrobeItem = {
    id: makeId(),
    createdAt: Date.now(),
    ...input,
  };
  saveItems([newItem, ...items]);
  return newItem;
}
