import React from "react";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";

const Navbar = () => {

  // TODO: Conditionally render login button if user is not logged in. Need SessionCookie

  return (
    <div className="navbar sticky">
      <h1 className="navbar-title">Social Code Challenges</h1>
      <nav className="navbar-links">
        <Link to="/" className="navbar-challenges">
          Challenges
        </Link>
        <Link to='/login' className="navbar-login">Login</Link>
      </nav>
    </div>
  );
};

export default Navbar;
