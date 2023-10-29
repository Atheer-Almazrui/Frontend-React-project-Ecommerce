import { useState } from 'react'
import { Link } from 'react-router-dom'

import '../styles/header.scss'

// const pages = [
//   {
//     name: 'Home',
//     path: '/'
//   },
//   {
//     name: 'About',
//     path: '/about'
//   },
//   {
//     name: 'Contact',
//     path: '/contact'
//   }
// ]

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  // use .map between bars in nav
  return (
    <nav className="navigation">
      <Link to="/" className="brand-name">
        SPARK
      </Link>

      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}>
        {/* icon from Heroicons.com */}
        <svg viewBox="0 0 20 20" fill="white">
          <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" />
        </svg>
      </button>
      <div className={isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'}>
        <ul>
          <li>
            <Link
              to="/"
              className="nav-link hamburger-link"
              onClick={() => {
                setIsNavExpanded(false)
              }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="nav-link hamburger-link"
              onClick={() => {
                setIsNavExpanded(false)
              }}>
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="nav-link hamburger-link"
              onClick={() => {
                setIsNavExpanded(false)
              }}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
