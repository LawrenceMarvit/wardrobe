import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function WardrobeItemPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: item, error } = await supabase
    .from("wardrobe_items")
    .select("id, title, category, confidence, is_public, is_loanable, created_at, user_id")
    .eq("id", params.id)
    .single();

  if (error) {
    return (
      <div>
        <p>Item not found</p>
        <Link href="/wardrobe">Back</Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/wardrobe">Back</Link>
      <h1>{item.title}</h1>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  );
}
