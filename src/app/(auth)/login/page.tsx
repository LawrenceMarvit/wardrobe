export default function LoginPage() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="w-full max-w-sm rounded-xl bg-neutral-900 p-6 shadow">
          <h1 className="text-2xl font-semibold mb-2 text-white">
            Welcome back
          </h1>
          <p className="text-sm text-neutral-400 mb-6">
            Let’s build your digital wardrobe.
          </p>
  
          <label className="block text-sm mb-2 text-neutral-300">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg bg-neutral-800 px-3 py-2 mb-4 text-white"
          />
  
          <button className="w-full rounded-lg bg-white text-black py-2 font-medium">
            Send me a login link
          </button>
  
          <p className="text-xs text-neutral-500 mt-4">
            No password. We’ll email you a secure sign-in link.
          </p>
        </div>
      </main>
    );
  }
  