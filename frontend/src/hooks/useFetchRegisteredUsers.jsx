import React, { useState, useEffect, useContext } from 'react'
import useUserStatus from './useUserStatus'
import axios from 'axios'
import UserDataContext from '../context/UserDataContext'

const useFetchRegisteredUsers = (challengeId) => {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { userData } = useContext(UserDataContext)


  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/challenges/registrations/${challengeId}`, { withCredentials: true })
        const data = await response.data

        console.log('RESPONSE: ', response)
        console.log('RESPONSE DATA: ', data)
        console.log('USERNAME: ', userData.username)

        if (response.status === 200 && data.includes(userData.username)) {
          setIsRegistered(true)
          setIsLoading(false)
        }

      } catch (error) {
        console.log(error.message)
      }

    }
    fetchRegisteredUsers()
  }, [userData])

  return { isRegistered, isLoading }
}

export default useFetchRegisteredUsers
