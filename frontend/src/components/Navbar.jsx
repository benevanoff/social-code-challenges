import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar sticky">
      <h1 className="navbar-title">Social Code Challenges</h1>
      <nav className="navbar-links">
        <Link to="/" className="navbar-challenges">
          Challenges
        </Link>
        <button className="navbar-profile">T</button>
      </nav>
    </div>
  );
};

export default Navbar;
