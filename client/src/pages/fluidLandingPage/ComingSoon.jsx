import React from 'react'
import { Link } from 'react-router-dom'
import SimpleWaves from './SimpleWaves'

/**
 * ComingSoon Page Component
 * A minimalist, theme-consistent page for under-development routes.
 */
function ComingSoon() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-[var(--color-text)] overflow-hidden">
      {/* Reusing the beautiful wave background */}
      <SimpleWaves />

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
        <h1 className="text-6xl font-black tracking-tighter opacity-90 drop-shadow-sm">
          MINIGRAM <span className="text-[var(--color-primary)] font-light text-2xl uppercase tracking-widest ml-4">v2.0</span>
        </h1>
        
        <div className="w-16 h-[2px] bg-[var(--color-primary)] opacity-40 rounded-full" />
        
        <h2 className="text-4xl font-light tracking-tight text-[var(--color-muted)]">
          This feature is coming soon...
        </h2>
        
        <p className="max-w-md text-sm text-[var(--color-muted)] font-light tracking-wide italic">
          We're currently flowing through some new updates to make your experience seamless. Stay tuned!
        </p>

        {/* Navigation Action */}
        <Link 
          to="/fluid-test" 
          className="mt-8 px-10 py-3 bg-transparent border border-white/10 rounded-full text-xs uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
        >
          Go Back Home
        </Link>
      </section>

      {/* Decorative Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-bg)_100%)] opacity-40 pointer-events-none" />
    </main>
  )
}

export default ComingSoon
