import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchAllChallenges = () => {
  const [allChallengesData, setAllChallengesData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchChallengesData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/challenges', { withCredentials: true })
        const data = await response.data

        if (response.status === 200 && data != [])
          setAllChallengesData(data)
        setIsLoading(false)
        console.log("Fetched all challenges")

      } catch (e) {
        setError(e.message)
        console.error(error)
      }

    }

    fetchChallengesData()
  }, [])
  return { allChallengesData, isLoading, error }
}

export default useFetchAllChallenges
