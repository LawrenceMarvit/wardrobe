// src/lib/wardrobeStore.ts

export type Confidence = "low" | "medium" | "high";

export type ClothingItem = {
  id: string;
  name: string;
  category?: string | null;
  color?: string | null;
  season?: string | null;
  notes?: string | null;
  imageUrl?: string | null;
  confidence?: Confidence | null;
  createdAt?: string | null;
};

// Local in-memory store (client runtime helper)
let items: ClothingItem[] = [];

export function setItems(next: ClothingItem[]) {
  items = Array.isArray(next) ? next : [];
}

export function getItems(): ClothingItem[] {
  return items;
}

export function getItemById(id: string): ClothingItem | undefined {
  return items.find((i) => i.id === id);
}

export function insertItem(item: ClothingItem) {
  items = [item, ...items];
}

export function deleteItem(id: string) {
  items = items.filter((i) => i.id !== id);
}

// Optional persistence in localStorage (safe no-op on server)
const LS_KEY = "wardrobe_items_v1";

export function loadItems(): ClothingItem[] {
  if (typeof window === "undefined") return items;
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return items;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) items = parsed;
  } catch {
    // ignore
  }
  return items;
}

export function saveItems(next?: ClothingItem[]) {
  if (typeof window === "undefined") return;
  try {
    const toSave = next ?? items;
    window.localStorage.setItem(LS_KEY, JSON.stringify(toSave));
  } catch {
    // ignore
  }
}
