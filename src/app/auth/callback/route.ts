import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  // Supabase sends ?code=... for PKCE flow
  const code = url.searchParams.get("code");

  // Where to send the user after login
  const next = url.searchParams.get("next") ?? "/wardrobe";
  const redirectTo = new URL(next, url.origin);

  // We MUST create the response first, so cookies can be set onto it.
  const response = NextResponse.redirect(redirectTo);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value;
      },
      set(name, value, options) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name, options) {
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // If exchange fails, go back to login with a hint
    if (error) {
      const back = new URL("/login", url.origin);
      back.searchParams.set("error", "auth_callback_failed");
      back.searchParams.set("message", error.message);
      return NextResponse.redirect(back);
    }
  }

  return response;
}
