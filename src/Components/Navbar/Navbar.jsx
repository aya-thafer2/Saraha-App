import React from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

function Navbar({ logUser, setLogUser }) {
  const logout = () => {
    setLogUser(null);
    cookie.remove("token");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-custom navbar-dark ">
      <div className="container">
        <Link className="navbar-brand" to="">
          <img src="/assets/images/logo300.png" width={54} alt="logo" />{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/list">
                Users List
              </Link>
            </li>
            {logUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/messages">
                    My Messages
                  </Link>
                </li>
                <li className="nav-item" onClick={logout}>
                  <Link className="nav-link" to="#">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
