import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { firebaseAuth } from '../../provider/AuthProvider'
import { Navbar, Button } from 'react-bootstrap'
import './CustomNavbar.css'

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

const CustomNavbar = () => {
  const { token, setToken } = useContext(firebaseAuth)
  const navLinks = token ? authNavlinks : unAuthNavLinks

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setToken(null)
  }
  return (
    <Navbar expand="xl" className="py-3" variant="dark" bg="dark">
      <NavLink to="/" className="navbrand ml-4">
        Candidates Community
      </NavLink>
      <div className="mr-auto"></div>
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className="ml-4 navlink"
          activeClassName="active-navlink"
        >
          {link.name}
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
    </Navbar>
  )
}

// <NavLink
// to={item.path}
// className="ml-4 pb-2"
// key={item.name}
// activeClassName="active-navlink"
// onClick={() => closeMenu()}
// >

export default CustomNavbar
