'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabaseClient'

export default function LoginPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setMsg('Sending magic link...')

    const origin = window.location.origin

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // IMPORTANT: email link must come back to /auth/callback
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) return setMsg(`Error: ${error.message}`)
    setMsg('Sent! Now click the email link.')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12, width: 320 }}>
        {/* BIG VERSION LABEL SO WE KNOW WE’RE ON THE NEW DEPLOY */}
        <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center' }}>
          LOGIN PAGE — VERSION V3A
        </div>

        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10 }}
        />

        <button type="submit" style={{ padding: 10, fontWeight: 700 }}>
          SEND MAGIC LINK (V3A)
        </button>

        {msg ? <div style={{ opacity: 0.9, textAlign: 'center' }}>{msg}</div> : null}
      </form>
    </div>
  )
}
