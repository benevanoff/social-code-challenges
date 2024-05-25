import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoginContext from '../context/LoginContext'
import { useContext } from 'react'
import UserDataContext from '../context/UserDataContext'

const useUserStatus = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
  const { userData, setUserData } = useContext(UserDataContext)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/whoami', { headers: { "Content-Type": "application/json" }, withCredentials: true })
        const data = await response.data
        if (response.status === 200) {
          setUserData(data)
          setIsLoggedIn(true)
          setIsLoading(false)
        }

      } catch (error) {
        if (error.response.status === 403) { }
      }
    }

    getUserData()
  }, [isLoggedIn])


  return { isLoggedIn, setIsLoggedIn, userData, isLoading }
}

export default useUserStatus;
