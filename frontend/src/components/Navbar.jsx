import React from "react";
import { Link } from "react-router-dom";
import useUserStatus from "../hooks/useUserStatus";
import UserProfileButton from "./UserProfileButton";
import LoginContext from "../context/LoginContext";

const Navbar = () => {

  // TODO: Conditionally render login button if user is not logged in. Need SessionCookie

  const { isLoggedIn, userData, isLoading } = useUserStatus()
  // const { isLoggedIn } = useContext(LoginContext)

  return (
    <div className="navbar sticky">
      <h1 className="navbar-title">Social Code Challenges</h1>
      <nav className="navbar-links">
        <Link to="/" className="navbar-challenges">
          Challenges
        </Link>
        {(isLoggedIn && !isLoading) ? <UserProfileButton userData={userData} /> :
          <Link to='/login' className="navbar-login">Login</Link>
        }
      </nav>
    </div>
  );
};

export default Navbar;
