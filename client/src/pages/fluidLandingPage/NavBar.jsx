function NavBar() {
    return (
        <nav
            id="fluid-landing-page-navbar"
            className='h-16 
    bg-[var(--color-surface)] 
    text-[var(--color-text)]
    flex
    items-center
    justify-between
    px-12
    '>
            <Logo />
            <Links />
        </nav>
    )
}

export default NavBar

function Logo() {
    return (
        <div id="fluid-landing-page-navbar-logo" className='flex items-center gap-2'>
            <div id="fluid-landing-page-logo-container" className="w-12 h-12">
                <img src="" alt="📷" className='w-full h-full object-cover' />
            </div>
            <div id="fluid-landing-page-logo-text" className="text-xl">Minigram</div>
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