import React, { useState } from 'react'


const UserProfileButton = ({ userData }) => {
  const text = userData.username[0]
  const [dropdownActive, setDropdownActive] = useState(false)

  return (
    <>
      <button className='navbar-user-profile' onClick={() => {
        setDropdownActive(!dropdownActive)
        console.log(dropdownActive)
      }
      }>
        {text}
      </button >

    </>
  )
}

export default UserProfileButton
