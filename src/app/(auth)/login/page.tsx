'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginPage() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const sendMagicLink = async () => {
    setMsg('Sending...')
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMsg(error.message)
    } else {
      setMsg(
        `Sent! Check your email. (It should go to: ${window.location.origin}/auth/callback)`
      )
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'black',
        color: 'white',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <input
          style={{ padding: 10, fontSize: 18, width: 300 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />
        <br />
        <br />
        <button
          style={{ padding: 10, fontSize: 18 }}
          onClick={sendMagicLink}
        >
          Send Magic Link
        </button>
        <p style={{ marginTop: 20, opacity: 0.8 }}>{msg}</p>
      </div>
    </div>
  )
}
