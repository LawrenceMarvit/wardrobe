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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          style={{
            padding: '12px',
            fontSize: '18px',
            marginBottom: '16px',
            width: '280px',
          }}
        />
        <br />
        <button
          onClick={sendMagicLink}
          style={{ padding: '12px 24px', fontSize: '18px' }}
        >
          Send Magic Link
        </button>

        <p style={{ marginTop: '20px', opacity: 0.8 }}>{msg}</p>
      </div>
    </div>
  )
}
