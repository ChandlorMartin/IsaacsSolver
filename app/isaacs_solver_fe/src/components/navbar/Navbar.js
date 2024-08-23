import HomePage from '../../pages/Home'
import KinematicsPage from '../../pages/Kinematics'
import ThermodynamicsPage from '../../pages/Thermodynamics'
import { BrowserRouter, Navigate, NavLink, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react";
import { ReactComponent as Hamburger } from "../../HamburgerIcon.svg"
import {useTheme} from '@mui/material/styles'
import './navbar.css'


const Navbar = () => {
  const theme = useTheme();
  const [showNavbar, setShowNavbar] = useState(false)
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar" style={{backgroundColor: theme.palette.background.secondary}}>
          <div className="container">
            <div className="menu-icon" onClick={handleShowNavbar}>
              <Hamburger />
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>    
                <li>
                  <NavLink to="/Kinematics" >Kinematics</NavLink>
                </li>    
                <li>
                  <NavLink to="/Thermodynamics">Thermodynamics</NavLink>
                </li>    
              </ul>
            </div>
          </div>
        </nav>
        <Routes> 
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Kinematics" element={<KinematicsPage />}></Route>
          <Route path="/Thermodynamics" element={<ThermodynamicsPage />}/>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
  
export default Navbar