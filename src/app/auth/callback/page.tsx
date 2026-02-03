'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    const finishLogin = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error) {
        console.error(error)
        router.push('/login')
        return
      }

      router.push('/wardrobe')
    }

    finishLogin()
  }, [router])

  return <p style={{ color: 'white' }}>Signing you in...</p>
}
