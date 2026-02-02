import { supabase } from "@/lib/supabaseClient";

export type Confidence = "low" | "medium" | "high";

export type WardrobeItem = {
  id: string;
  title: string;
  category: string;
  confidence: Confidence;
  is_public: boolean;
  is_loanable: boolean;
  owner_id: string | null;
  created_at: string;
};

// ✅ Used by /wardrobe page
export async function getMyItems() {
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user ?? null;

  // Not logged in → show public items (no crash)
  if (!user) {
    const { data, error } = await supabase
      .from("wardrobe_items")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as WardrobeItem[];
  }

  // Logged in → show my items
  const { data, error } = await supabase
    .from("wardrobe_items")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as WardrobeItem[];
}

// ✅ Used by /add-item page (THIS is what your build error is about)
export async function insertItem(input: {
  title: string;
  category: string;
  confidence: Confidence;
  is_public: boolean;
  is_loanable: boolean;
}) {
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user ?? null;

  if (!user) {
    throw new Error("You must be logged in to add items.");
  }

  const { data, error } = await supabase
    .from("wardrobe_items")
    .insert([
      {
        title: input.title,
        category: input.category,
        confidence: input.confidence,
        is_public: input.is_public,
        is_loanable: input.is_loanable,
        owner_id: user.id,
      },
    ])
    .select("*")
    .single();

  if (error) throw error;
  return data as WardrobeItem;
}

// Optional helper for details page if you use it
export async function getItemById(id: string) {
  const { data, error } = await supabase
    .from("wardrobe_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as WardrobeItem;
}
