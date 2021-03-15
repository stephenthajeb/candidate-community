import React from 'react'
import './Hamburger.css'

const Hamburger = ({ toggleMenu }) => {
  return (
    <div
      id="hamburger"
      className="menu-btn"
      role="button"
      onClick={() => {
        toggleMenu()
      }}
    >
      <div className="btn-line"></div>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
    </div>
  )
}
export default Hamburger
