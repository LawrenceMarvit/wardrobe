'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<string>('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('Sending magic link...')

    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://wardrobe-mm5f.vercel.app'

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // THIS IS THE IMPORTANT PART:
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      setMsg(`Error: ${error.message}`)
      return
    }

    setMsg('Check your email and click the link.')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12 }}>
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10, minWidth: 280 }}
        />
        <button type="submit" style={{ padding: 10 }}>
          Send Magic Link
        </button>
        {msg ? <div style={{ opacity: 0.8 }}>{msg}</div> : null}
      </form>
    </div>
  )
}
