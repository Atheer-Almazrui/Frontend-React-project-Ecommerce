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
    <div className="header-container">
      <nav className="navigation">
        <Link to="/">
          <img className="logo" src="src\assets\spark-logo.png" alt="logo Image" />
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
            <li>
              <Link
                to="/admin-dashboard"
                className="nav-link hamburger-link"
                onClick={() => {
                  setIsNavExpanded(false)
                }}>
                AdminDashboard
              </Link>
            </li>
            <li>
              <i className="fa fa-shopping-cart"></i>
            </li>
          </ul>
        </div>
      </nav>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 120 1290 300">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,192L80,197.3C160,203,320,213,480,192C640,171,800,117,960,122.7C1120,128,1280,192,1360,224L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
    </div>
  )
}

export default Header
