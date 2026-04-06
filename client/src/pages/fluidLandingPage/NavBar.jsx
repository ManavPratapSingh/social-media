function NavBar() {
    return (
        <nav
            id="fluid-landing-page-navbar"
            className='h-20 
    bg-transparent 
    backdrop-blur-sm
    text-[var(--color-text)]
    flex
    items-center
    justify-between
    px-12
    sticky
    top-0
    z-50
    border-b
    border-white/5
    '>
            <Logo logo={null} />
            <Links />
        </nav>
    )
}

export default NavBar

function Logo({ logo }) {
    return (
        <div id="fluid-landing-page-navbar-logo" className='flex items-center gap-2'>
            <div id="fluid-landing-page-logo-container" className="w-12 h-12 flex items-center justify-center overflow-hidden">
                {logo ? (
                    <img src={logo} alt="logo" className='w-full h-full object-cover' />
                ) : (
                    <div className='w-8 h-8 rounded-full opacity-80' />
                )}
            </div>
            <div id="fluid-landing-page-logo-text" className="text-xl font-semibold tracking-tight">Minigram</div>
        </div>
    )
}

function Links() {
    return (
        <ul id="fluid-landing-page-navbar-links" className='gap-8 cursor-pointer'>
            {["Blog", "About", "Contact", "Login", "Signup"].map((link, index) => (
                <li key={index} className="text-sm">{link}</li>
            ))}
        </ul>
    )
} 