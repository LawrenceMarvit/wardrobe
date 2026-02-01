import { supabase } from "@/lib/supabaseClient";

export async function loadItems() {
  const { data, error } = await supabase
    .from("wardrobe_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export default async function WardrobePage() {
  const items = await loadItems();

  return (
    <div>
      <h1>Wardrobe</h1>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
