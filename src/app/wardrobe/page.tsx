import { createClient } from "@/lib/supabase/server";

export default async function WardrobePage() {
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("wardrobe_items")
    .select("id, name, category, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <div>
      <h1>Wardrobe</h1>

      {/* Plain anchor = always clickable */}
      <p>
        <a href="/add-item">+ Add Item</a>
      </p>

      <ul>
        {(items ?? []).map((item) => (
          <li key={item.id}>
            <a href={`/wardrobe/${item.id}`}>
              {item.name} {item.category ? `— ${item.category}` : ""}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
