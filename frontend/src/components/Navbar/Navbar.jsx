import React from "react";
import { Link } from "react-router-dom";
import useUserStatus from '../../hooks/useUserStatus'
import UserProfileButton from "./UserProfileButton";

const Navbar = () => {

  const { isLoggedIn, userData, isLoading } = useUserStatus()


  return (
    <div className="navbar sticky">
      <Link to='/' className="navbar-title">Social Code Challenges</Link>

      <div className="navbar-links-container">
        <input type="checkbox" id="sidebar-active" />
        <label className='open-sidebar-button' htmlFor='sidebar-active'>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
        </label>


        <label id='overlay' htmlFor='sidebar-active' />
        <nav className="navbar-links">
          <label className="close-sidebar-button" htmlFor='sidebar-active'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
          </label>

          <Link to='/' className="navbar-home">Home</Link>
          <Link to="/" className="navbar-challenges">
            Challenges
          </Link>
          <Link className='navbar-profile' to={`/profile/${userData.username}`}>Profile</Link>
          {
            (isLoggedIn && !isLoading) ? <UserProfileButton id='profile-button' userData={userData} /> :
              <Link to='/login' className="navbar-login">Login</Link>
          }
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
