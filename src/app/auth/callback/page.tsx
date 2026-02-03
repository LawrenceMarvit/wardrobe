'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // This is the magic line that actually logs the user in
      await supabase.auth.exchangeCodeForSession(window.location.href)

      router.replace('/wardrobe')
    }

    run()
  }, [router])

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      Logging you in...
    </div>
  )
}
