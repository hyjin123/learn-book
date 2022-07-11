import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  // navigating between pages using react router
  const navigate = useNavigate();

  // set user if there is one so that navbar is displayed accordingly if the user is logged in or no user is logged in
  const token = props.token;
  const setToken = props.setToken;
  const token1 = localStorage.getItem("jwtoken");
  useEffect(() => {
    setToken(token1);
  }, [token1]);

  // When a user clicks logout
  const logout = (event) => {
    event.preventDefault();
    // reset the localstorage jwtoken to an empty string
    localStorage.setItem("jwtoken", "", { maxAge: 1 });
    localStorage.setItem("userinfo", "", { maxAge: 1 });
    // navigate to the login page
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/home">
        LearnBook
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {token && (
            <li className="nav-item active">
              <a className="nav-link" href="/home">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
          )}
          {!token && (
            <li className="nav-item active">
              <a className="nav-link" href="/login">
                Login <span className="sr-only">(current)</span>
              </a>
            </li>
          )}
          {!token && (
            <li className="nav-item active">
              <a className="nav-link" href="/register">
                Register <span className="sr-only">(current)</span>
              </a>
            </li>
          )}
          {token && (
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                Profile
              </a>
            </li>
          )}
          {token && (
            <li className="nav-item">
              <a className="nav-link" href="/explore">
                Explore
              </a>
            </li>
          )}
          {token && (
            <li className="nav-item">
              <a className="nav-link" onClick={logout}>
                Logout <span className="sr-only">(current)</span>
              </a>
            </li>
          )}
          {/* <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li> */}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
