import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import * as API from '../../constants/Config';
import * as API2 from '../../constants/API';
import axios from 'axios';

const Navbar = () => {

  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(localStorage.getItem('is_logged'));

  useEffect(() => {
    console.log(isLogged)
      // const cancelTokenSource = axios.CancelToken.source();
      if (isLogged)
      {
        if (!user) {
          axios.get(API2.USER, {withCredentials: true,}).then(function (res) {
            if (res.status === 200) {
              setUser(res.data);
            }
            else {
              console.log("RESPONSE DATA: ");
              console.log(res);
            }
          }).catch(error => {
            console.log(error)
            if (error.response !== undefined) {
              if (error.response.status === 401) {
                console.log('Not login yet.');
              }
            }
              
            if (error.message === 'Network Error') {
              console.log('NETWORK ERR');
            }
          })
        }
      } else {
        setUser(null);
      }
  }, [isLogged]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Home</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
            </li>
            <li className="nav-item">
              {user ? 
                <NavLink className="nav-link" to="/user-profile" tabIndex="-1">Hi, {user.email}!</NavLink>
                : <NavLink className="nav-link" to="/sign-in" tabIndex="-1">Sign In</NavLink>
              }              
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn-t btn-link-app" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;