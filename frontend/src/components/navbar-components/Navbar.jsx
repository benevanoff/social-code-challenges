import React from "react";
import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import useUserStatus from '../../hooks/useUserStatus'
import UserProfileButton from "./UserProfileButton";
import axios from "axios";

const Navbar = () => {

  const { isLoggedIn, userData, isLoading } = useUserStatus()
  const navigate = useNavigate()
  const refreshPage = () => {
    navigate(0)
  }


  const handleLogout = async () => {
    const response = await axios.post('http://localhost:8080/users/logout', null, { withCredentials: true })
    if (response.status == 200) {
      console.log(`Logged out ${userData.username} successfully`)
      navigate('/')
      refreshPage()
    }
  }
  const profileLink = (<Link className={`${!isLoggedIn ? 'hidden' : 'navbar-profile'}`} to={`/profile/${userData.username}`}>Profile</Link>
  )

  const logoutButton = (<button className={`${isLoggedIn ? "navbar-logout" : 'hidden'}`} onClick={handleLogout}>Logout</button>
  )

  const createChallenge = (<Link className={`${userData.is_admin === 1 ? 'navbar-create-challenge' : 'hidden'}`} to='/challenges/create'>Create Challenge</Link>)

  return (
    <div className="navbar sticky">
      <Link to='/' className="navbar-title">Social Code Challenges</Link>

      <div className="navbar-links-container">
        <input type="checkbox" id="sidebar-active" />
        <label className='open-sidebar-button' htmlFor='sidebar-active'>
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
        </label>


        <label id='overlay' htmlFor='sidebar-active' />
        <nav className="navbar-links">
          <label className="close-sidebar-button" htmlFor='sidebar-active'>
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
          </label>

          <Link to='/home' className="navbar-home">Home</Link>
          <Link to="/challenges" className="navbar-challenges">
            Challenges
          </Link>
          {createChallenge}
          {profileLink}
          {logoutButton}
          {
            (isLoggedIn && !isLoading) ? (
              <>
                <UserProfileButton id='profile-button' userData={userData} logoutButton={logoutButton} profileLink={profileLink} />
              </>
            )

              :
              <Link to='/login' className="navbar-login">Login</Link>
          }
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
