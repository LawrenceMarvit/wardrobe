// src/app/wardrobe/page.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Item = {
  id: string
  name?: string | null
  category?: string | null
  confidence?: string | null
  is_public?: boolean | null
  loanable?: boolean | null
  created_at?: string | null
}

export default function WardrobePage() {
  const [email, setEmail] = useState<string>('')
  const [items, setItems] = useState<Item[]>([])
  const [msg, setMsg] = useState<string>('')

  useEffect(() => {
    const run = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user
      if (!user) {
        setMsg('Not logged in. Go to Login.')
        return
      }
      setEmail(user.email ?? '')

      // Load items (if your table name is different, change 'items' to your table name)
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setMsg(`Could not load items: ${error.message}`)
        return
      }
      setItems((data as Item[]) ?? [])
    }

    run()
  }, [])

  return (
    <div style={{ padding: 32, maxWidth: 900 }}>
      <h1 style={{ fontSize: 72, margin: '0 0 16px 0' }}>Wardrobe</h1>

      {email ? (
        <div style={{ marginBottom: 24, fontSize: 20 }}>
          Logged in as <b>{email}</b>
        </div>
      ) : (
        <div style={{ marginBottom: 24, opacity: 0.8 }}>{msg}</div>
      )}

      {/* THIS is the fix: REAL LINK that always navigates */}
      <Link
        href="/add-item"
        style={{
          display: 'inline-block',
          fontSize: 26,
          textDecoration: 'none',
          margin: '12px 0 28px 0',
        }}
      >
        + Add Item
      </Link>

      {msg && !items.length ? (
        <div style={{ opacity: 0.8 }}>{msg}</div>
      ) : null}

      <div style={{ display: 'grid', gap: 16 }}>
        {items.map((it) => (
          <div
            key={it.id}
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 18,
              padding: 18,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700 }}>
              {it.name ?? '(no name)'}
            </div>
            <div style={{ opacity: 0.85, marginTop: 6 }}>
              Category: <b>{it.category ?? '-'}</b> · Confidence:{' '}
              <b>{it.confidence ?? '-'}</b>
            </div>
            <div style={{ opacity: 0.85, marginTop: 6 }}>
              Public: <b>{String(it.is_public ?? false)}</b> · Loanable:{' '}
              <b>{String(it.loanable ?? false)}</b>
            </div>
            <div style={{ opacity: 0.65, marginTop: 10 }}>ID: {it.id}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28 }}>
        <Link href="/login" style={{ opacity: 0.8 }}>
          Login
        </Link>
      </div>
    </div>
  )
}
