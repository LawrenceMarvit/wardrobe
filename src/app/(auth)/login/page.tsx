'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setMsg('Sending magic link...')

    const redirectTo = `${window.location.origin}/auth/callback`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    })

    if (error) {
      setMsg(`Error: ${error.message}`)
      return
    }

    setMsg(`Sent! Check your email. (It should go to: ${redirectTo})`)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12 }}>
        <input
          type="email"
          value={email}
          placeholder="you@email.com"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, width: 320 }}
          required
        />
        <button type="submit" style={{ padding: 10 }}>
          Send Magic Link
        </button>
        <div style={{ opacity: 0.8 }}>{msg}</div>
      </form>
    </div>
  )
}
