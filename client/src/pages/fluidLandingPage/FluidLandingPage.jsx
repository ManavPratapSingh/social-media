import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import SimpleWaves from './SimpleWaves';
import HeroSection from './HeroSection';

function FluidLandingPage() {
  return (
    <main className='relative'>
    <NavBar />
    <SimpleWaves />
    <HeroSection />
    <Footer />
    </main>
  )
}

export default FluidLandingPage

function Footer() {
  const links = [
    "Meta", "About", "Blog","Help", "Privacy", "Terms", "Locations"
  ];

  return (
    <footer className='py-12 px-4 bg-transparent text-[var(--color-muted)] flex flex-col items-center gap-6 border-t border-white/10'>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-4xl">
        {links.map((link, index) => (
          <Link
            key={index}
            to="/coming-soon"
            className="text-xs font-medium hover:underline transition-all"
          >
            {link}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs font-light">
        <select className="bg-transparent border-none focus:outline-none cursor-pointer">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
        <span>© 2026 Minigram from Meta</span>
      </div>
    </footer>
  )
}