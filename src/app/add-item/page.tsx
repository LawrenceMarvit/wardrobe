import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default function AddItemPage() {
  async function createItem(formData: FormData) {
    "use server";

    const supabase = await createClient();

    const title = String(formData.get("name") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const confidence = String(formData.get("confidence") ?? "").trim();

    const is_public = formData.get("is_public") === "on";
    const is_loanable = formData.get("is_loanable") === "on";

    if (!title) {
      redirect("/add-item");
    }

    const { data, error } = await supabase
      .from("wardrobe_items")
      .insert([
        {
          title,
          category,
          confidence,
          is_public,
          is_loanable,
        },
      ])
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    redirect(`/wardrobe/${data.id}`);
  }

  return (
    <form action={createItem}>
      <div>
        <label>
          Name
          <input name="name" />
        </label>
      </div>

      <div>
        <label>
          Category
          <input name="category" />
        </label>
      </div>

      <div>
        <label>
          Confidence
          <input name="confidence" />
        </label>
      </div>

      <div>
        <label>
          Public
          <input name="is_public" type="checkbox" />
        </label>
      </div>

      <div>
        <label>
          Loanable
          <input name="is_loanable" type="checkbox" />
        </label>
      </div>

      <button type="submit">Save Item</button>
    </form>
  );
}
