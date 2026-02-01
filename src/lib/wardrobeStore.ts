export type WardrobeItem = {
    id: string;
    title?: string;
    category?: string;
    confidence?: string;
    isPublic?: boolean;
    isLoanable?: boolean;
    createdAt?: number;
  };
  
  const STORAGE_KEY = "wardrobe_items_v1";
  
  function makeId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
  
  export function loadItems(): WardrobeItem[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  
  export function saveItems(items: WardrobeItem[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
  
  export function addItem(item: Omit<WardrobeItem, "id">) {
    const items = loadItems();
    const newItem: WardrobeItem = {
      ...item,
      id: makeId(),
      createdAt: Date.now(),
    };
    items.unshift(newItem);
    saveItems(items);
  }
  
  export function clearItems() {
    saveItems([]);
  }
  
  export function getItemById(id: string) {
    return loadItems().find((i) => i.id === id);
  }
  
  export function deleteItem(id: string) {
    const items = loadItems().filter((i) => i.id !== id);
    saveItems(items);
  }
  