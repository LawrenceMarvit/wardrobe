'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://wardrobe-mm5f.vercel.app/auth/callback',
      },
    })

    if (error) setMsg(error.message)
    else setMsg('Magic link sent. Check your email.')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          style={{ padding: 8, marginRight: 8 }}
        />
        <button type="submit">Send Magic Link</button>
      </form>
      <p>{msg}</p>
    </div>
  )
}
