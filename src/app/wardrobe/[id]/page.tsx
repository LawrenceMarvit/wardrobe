import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function supabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );
}

export default async function WardrobeItemPage({ params }: { params: { id: string } }) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("wardrobe_items")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Item load failed</h1>
        <div>Error: {error.message}</div>
        <Link href="/wardrobe">Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{data.name}</h1>
      <div>Category: {data.category}</div>
      <div>Confidence: {data.confidence}</div>
      <div>ID: {data.id}</div>
      <Link href="/wardrobe">Back</Link>
    </div>
  );
}
