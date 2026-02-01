import { supabase } from "./supabaseClient";

export async function loadItems() {
  const { data, error } = await supabase
    .from("wardrobe_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addItem(item: {
  title?: string;
  category?: string;
  confidence?: string;
  is_public?: boolean;
  is_loanable?: boolean;
}) {
  const { data, error } = await supabase
    .from("wardrobe_items")
    .insert(item)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteItem(id: string) {
  const { error } = await supabase
    .from("wardrobe_items")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
