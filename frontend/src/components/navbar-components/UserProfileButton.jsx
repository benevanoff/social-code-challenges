import React, { useState } from 'react'


const UserProfileButton = ({ userData, profileLink, logoutButton }) => {
  const text = userData.username[0]
  const [dropdownActive, setDropdownActive] = useState(false)
  return (
    <>
      <button className='navbar-user-profile' onClick={() => setDropdownActive(!dropdownActive)}>
        {text}
      </button >
      <label id='profile-dropdown-overlay' htmlFor='profile-dropdown' />
      <div id='profile-dropdown' className={`profile-dropdown ${dropdownActive ? 'active' : 'inactive'}`}>
        {profileLink}
        {logoutButton}
      </div>
    </>
  )
}

export default UserProfileButton
