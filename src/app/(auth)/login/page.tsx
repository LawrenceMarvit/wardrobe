const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    setMsg(error.message)
  } else {
    setMsg('Check your email for the magic link.')
  }
}
