import React, { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { firebaseAuth } from '../../provider/AuthProvider'
import Hamburger from './Hamburger'
import { Button } from 'react-bootstrap'
import './Navbar.css'

// Todo: Refactor

const unAuthNavLinks = [
  {
    path: '/register',
    name: 'Register',
  },
  {
    path: '/signin',
    name: 'Sign in',
  },
]

const authNavlinks = [
  {
    path: '/profile',
    name: 'Profile',
  },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { token, setToken } = useContext(firebaseAuth)
  const navLinks = token ? authNavlinks : unAuthNavLinks

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    const menu = document.getElementById('hamburger')
    const navOverlay = document.getElementById('nav-overlay')
    if (menu) {
      menu.classList.toggle('cross')
    }
    if (navOverlay) {
      navOverlay.classList.toggle('show')
    }
  }
  const closeMenu = () => {
    setIsMenuOpen(false)
    const menu = document.getElementById('hamburger')
    const navOverlay = document.getElementById('nav-overlay')
    if (menu) {
      menu.classList.remove('cross')
    }
    if (navOverlay) {
      navOverlay.classList.remove('show')
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setToken(null)
  }
  return (
    <>
      <NavOverlay closeMenu={closeMenu} />
      <nav className="navbar mb-5">
        <div className="container-fluid px-3 py-3">
          <div className="mr-auto">
            <Link to="/" className="home-icon">
              <span>Candidates Community</span>
            </Link>
          </div>
          <div className="nav-item-wrapper">
            {navLinks.map((item) => (
              <NavLink
                to={item.path}
                className="ml-4 pb-2"
                key={item.name}
                activeClassName="active-navlink"
                onClick={() => closeMenu()}
              >
                {item.name}
              </NavLink>
            ))}
            {token && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => handleSignOut()}
                className="ml-4"
              >
                Sign out
              </Button>
            )}
          </div>
          <Hamburger toggleMenu={toggleMenu} />
        </div>
      </nav>
    </>
  )
}

const NavOverlay = ({ closeMenu }) => {
  const { token } = useContext(firebaseAuth)
  const navLinks = token ? authNavlinks : unAuthNavLinks
  return (
    <div id="nav-overlay" className="navigation overlay">
      <div className="d-flex flex-column">
        <div className="nav-icon sidebar-logo">Candidates Community</div>
        {navLinks.map((item) => (
          <div key={item.name} className="sidebar-nav-wrap">
            <NavLink
              to={item.path}
              activeClassName="active-navlink"
              className="sidebar-nav-item"
              onClick={() => closeMenu()}
            >
              {item.name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navbar
