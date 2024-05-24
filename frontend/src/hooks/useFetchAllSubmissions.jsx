import React, { useState, useEffect } from 'react'
import axios from 'axios'



const useFetchAllSubmissions = (challengeId) => {
  const [allSubmissions, setAllSubmissions] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/challenges/submissions/all/${challengeId}`)
        const data = await response.data

        if (response.status === 200) {
          console.log('All Submissions: ', data)
          setAllSubmissions(data)
          setIsLoading(false)
        }

      } catch (error) {
        console.log(error.message)

      }

    }
    fetchAllSubmissions()
  }, [challengeId])

  return { allSubmissions }
}

export default useFetchAllSubmissions
