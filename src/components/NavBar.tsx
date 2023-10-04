import React from 'react';
// import LoginPage from './components/LoginPage'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#454545" }}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={ () => {navigate("/Home")} }>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={ () => {navigate("/Home/NewJob")} }>Create New Job</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={ () => {navigate("/")}}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default NavBar;