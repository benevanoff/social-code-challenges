import React from 'react'

const UserProfileButton = ({ userData, sidebarActive }) => {
  const text = userData.username[0]

  return (
    <>
      <button className='navbar-user-profile'>
        {text}
      </button>
    </>
  )
}

export default UserProfileButton
