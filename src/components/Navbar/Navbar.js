import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Hamburger from './Hamburger'
import './Navbar.css'

const navLinks = [
  {
    path: '/profile',
    name: 'Profile',
    icon: 'info-circle',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'hand-point-down',
  },
  {
    path: '/signin',
    name: 'Sign in',
    icon: 'mail-bulk',
  },
  {
    path: '/signout',
    name: 'Sign out',
    icon: 'mail-bulk',
  },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
  return (
    <>
      <NavOverlay closeMenu={closeMenu} />
      <nav className="navbar mb-5">
        <div className="container-fluid px-3 py-3">
          <div className="mr-auto">
            <Link to="/" className="home-icon">
              <i className="fas fa-tractor"></i>
              <span>Home Logo</span>
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
          </div>
          <Hamburger toggleMenu={toggleMenu} />
        </div>
      </nav>
    </>
  )
}

const NavOverlay = ({ closeMenu }) => {
  return (
    <div id="nav-overlay" className="navigation overlay">
      <div className="d-flex flex-column">
        <div className="nav-icon sidebar-logo">
          <i className="fas fa-tractor"></i>
          Home
        </div>
        {navLinks.map((item) => (
          <div key={item.name} className="sidebar-nav-wrap">
            <NavLink
              to={item.path}
              activeClassName="active-navlink"
              className="sidebar-nav-item"
              onClick={() => closeMenu()}
            >
              <div>
                <i className={'nav-icon fas fa-' + item.icon}></i>
              </div>
              {item.name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navbar
