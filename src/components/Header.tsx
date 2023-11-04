import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'
import { logout } from '../redux/slices/users/userSlice'

import '../styles/header.scss'

const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)
  const navigate = useNavigate()
  const [isNavExpanded, setIsNavExpanded] = useState(false)

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

            {isLoggedIn && (
              <>
                {userData?.role === 'admin' ? (
                  <li>
                    <Link
                      to="/dashboard/admin/profile"
                      className="nav-link hamburger-link"
                      onClick={() => {
                        setIsNavExpanded(false)
                      }}>
                      <i className="fa fa-user-shield fa-xl" style={{ color: '#02006b' }}></i>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/dashboard/user/profile"
                      className="nav-link hamburger-link"
                      onClick={() => {
                        setIsNavExpanded(false)
                      }}>
                      <i className="fa fa-user-large fa-xl" style={{ color: '#02006b' }}></i>
                    </Link>
                  </li>
                )}

                <li
                  className="nav-link hamburger-link"
                  onClick={() => {
                    setIsNavExpanded(false)
                    dispatch(logout())
                    navigate('/')
                  }}>
                  <i className="fa fa-sign-out fa-xl logout"></i>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    to="/signup"
                    className="nav-link hamburger-link"
                    onClick={() => {
                      setIsNavExpanded(false)
                    }}>
                    Sign up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="nav-link hamburger-link"
                    onClick={() => {
                      setIsNavExpanded(false)
                    }}>
                    Log in
                  </Link>
                </li>
              </>
            )}
            {/* the following code is to hide the cart icon if he is an admin, otherwies display the cart */}
            {userData?.role !== 'admin' && (
              <li>
                <i className="fa fa-shopping-cart fa-xl cart">
                  <span>1</span>
                </i>
                {/* fa-2xl  larger cart */}
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 120 1290 330">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,192L80,197.3C160,203,320,213,480,192C640,171,800,117,960,122.7C1120,128,1280,192,1360,224L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 75 1440 85">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,160L120,138.7C240,117,480,75,720,74.7C960,75,1200,117,1320,138.7L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
      </svg>
    </div>
  )
}

export default Header
