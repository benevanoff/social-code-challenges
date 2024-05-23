import axios from 'axios'
import React, { useState, useEffect } from 'react'

const useFetchChallengeDetails = (challengeId) => {
  const [challengeDetails, setChallengeDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchChallengeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/challenges/${challengeId}`)
        const data = await response.data

        if (response.status === 200 && data) {
          setChallengeDetails(data[0])
          setIsLoading(false)
        }

      } catch (error) {
        console.log(error.message)
      }
    }

    fetchChallengeDetails()
  }, [])

  return { challengeDetails, isLoading }
}

export default useFetchChallengeDetails
