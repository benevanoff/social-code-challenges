import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchSubmissionLeaderboard = (challengeId) => {
  // Route
  const [submissionLeaderboard, setSubmissionLeaderboard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSubmissionLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/challenges/submissions/${challengeId}`)
        const data = await response.data
        if (response.status === 200) {
          setSubmissionLeaderboard(data)
        }

      } catch (e) {
        setError(e)
      } finally {
        setIsLoading(false)
      }

    }

    fetchSubmissionLeaderboard()
  }, [challengeId])




  return { submissionLeaderboard, isLoading, error }
}

export default useFetchSubmissionLeaderboard
