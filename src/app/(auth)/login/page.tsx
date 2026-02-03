'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string>('')

  // If a magic-link lands on /login, this will finish login automatically.
  useEffect(() => {
    const finish = async () => {
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true })
        if (!error && data?.session) {
          router.replace('/wardrobe')
        }
      } catch {
        // ignore
      }
    }
    finish()
  }, [router])

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending magic link...')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Always send the email link back to your callback page on the same site
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setStatus(`Error: ${error.message}`)
      return
    }

    setStatus('Check your email and click the link.')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <form onSubmit={sendMagicLink} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, width: 260 }}
          required
        />
        <button type="submit" style={{ padding: '10px 16px' }}>
          Send Magic Link
        </button>
      </form>

      <div style={{ marginTop: 16, opacity: 0.8 }}>{status}</div>
    </div>
  )
}
