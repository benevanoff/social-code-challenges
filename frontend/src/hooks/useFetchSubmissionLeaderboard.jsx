import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchSubmissionLeaderboard = (challengeId) => {
  // Route
  const [submissionLeaderboard, setSubmissionLeaderboard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissionLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/challenges/submissions/${challengeId}`)
        const data = await response.data
        if (response.status === 200) {
          console.log(data)
          setSubmissionLeaderboard(data)
          setIsLoading(false)
        }

      } catch (error) {
        console.log(error.message)
      }

    }

    fetchSubmissionLeaderboard()
  }, [challengeId])




  return { submissionLeaderboard, isLoading }
}

export default useFetchSubmissionLeaderboard
