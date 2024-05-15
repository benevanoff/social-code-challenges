import React from 'react'

const UserProfileButton = ({ userData }) => {
  const text = userData.username[0]
  return (
    <button className='navbar-user-profile'>
      {text}



    </button>
  )
}

export default UserProfileButton
