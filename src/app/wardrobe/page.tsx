import Link from "next/link";
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
      <div>
        <Link href="/add-item">+ Add Item</Link>
      </div>

      <ul>
        {(items ?? []).map((item) => (
          <li key={item.id}>
            <Link href={`/wardrobe/${item.id}`}>
              {item.name} {item.category ? `— ${item.category}` : ""}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
