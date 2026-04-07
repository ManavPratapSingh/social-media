function HeroSection() {
    return (
        <section className='h-screen w-full top-0 z-0 text-[var(--color-text)] flex items-center justify-center px-4'>
            <div id="hero-section-post1" className="h-64 w-62 absolute top-1/3 left-1/5 -translate-x-1/2 -translate-y-1/2 -rotate-[15deg] rounded-lg bg-white/50 backdrop-blur-xl"/>
            <div id="hero-section-post2" className="h-64 w-62 absolute top-3/5 left-2/6 -translate-x-1/2 -translate-y-1/2 rotate-[7deg] rounded-lg bg-white/50 backdrop-blur-xl"/>
            <div id="hero-section-title" className="h-12 w-196 text-5xl text-center rounded-lg bg-white/50 backdrop-blur-xl z-10"></div>
            <div id="hero-section-flowing-comments" className="h-112 w-110 absolute top-3/7 left-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/50 backdrop-blur-xl"/>
        </section>
    )
}

export default HeroSection