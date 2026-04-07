import { Link } from "react-router-dom"

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
    absolute 
    w-full
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
        <Link to="/fluid-test" id="fluid-landing-page-navbar-logo" className='flex items-center gap-2 group'>
            <div id="fluid-landing-page-logo-container" className="w-12 h-12 flex items-center justify-center overflow-hidden">
                {logo ? (
                    <img src={logo} alt="logo" className='w-full h-full object-cover' />
                ) : (
                    <div className='w-8 h-8 bg-[var(--color-primary)] rounded-full opacity-80 group-hover:scale-110 transition-transform' />
                )}
            </div>
            <div id="fluid-landing-page-logo-text" className="text-xl font-semibold tracking-tight">Minigram</div>
        </Link>
    )
}

function Links() {
    const linkMap = {
        "Blog": "/coming-soon",
        "About": "/coming-soon",
        "Contact": "/coming-soon",
        "Login": "/sign-in",
        "Signup": "/sign-up"
    };

    return (
        <ul id="fluid-landing-page-navbar-links" className='flex gap-8'>
            {Object.entries(linkMap).map(([label, path], index) => (
                <li key={index}>
                    <Link 
                        to={path} 
                        className="text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--color-primary)] transition-all"
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}