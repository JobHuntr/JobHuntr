import React from 'react';
// import LoginPage from './components/LoginPage'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="job" onClick={ () => {navigate("/Home/NewJob")} }>Create New Job</button>
      <button className="home" onClick={ () => {navigate("/Home")} }>Home</button>
      <button className="logout" onClick={ () => {navigate("/")} }>Logout</button>
      <Outlet />
    </div>
  )
}

export default NavBar;