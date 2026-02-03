'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://wardrobe-mm5f.vercel.app/auth/callback',
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Magic link sent. Check your email.')
    }
  }

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',flexDirection:'column'}}>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{padding:10,marginRight:10}}
        />
        <button type="submit">Send Magic Link</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
