import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="flex justify-center items-center gap-8 py-4 shadow-md rounded-b-2xl">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg text-white font-medium transition duration-200 
          hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg text-white font-medium transition duration-200 
          hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
        }
      >
        Pastes
      </NavLink>
    </div>
  )
}

export default NavBar
