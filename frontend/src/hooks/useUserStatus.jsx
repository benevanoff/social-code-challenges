import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoginContext from '../context/LoginContext'
import { useContext } from 'react'

const useUserStatus = () => {
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/whoami', { headers: { "Content-Type": "application/json" }, withCredentials: true })
        const data = await response.data
        if (response.status == 200) {
          setUserData(data)
          setIsLoggedIn(true)
          setIsLoading(false)
        }

      } catch (error) {
        console.error(error.response)
      }
    }

    getUserData()
  }, [isLoggedIn])


  return { isLoggedIn, setIsLoggedIn, userData, isLoading }
}

export default useUserStatus;
