import React from 'react'
import Quicklinks from './Quicklinks.jsx'
import Logo from './Logo.jsx'
import MoreLinks from './MoreLinks.jsx'

function Navbar() {
  return (
    <nav className="sidebar-nav fixed left-0 top-0 w-[calc(200%/11)] h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] rounded-md p-4">
        <Logo/>
        <Quicklinks/>
        <MoreLinks/>
    </nav>
  )
}

export default Navbar