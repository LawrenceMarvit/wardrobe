import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  // If Supabase didn’t send a code, go back to login
  if (!code) {
    return NextResponse.redirect(new URL('/login', url.origin))
  }

  // We must create a response we can attach cookies to
  let response = NextResponse.redirect(new URL('/wardrobe', url.origin))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // This exchanges the "code" for a session + sets auth cookies
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  // If exchange fails, send user back to login
  if (error) {
    return NextResponse.redirect(new URL('/login', url.origin))
  }

  // Success: cookies are set on `response`, and it redirects to /wardrobe
  return response
}
