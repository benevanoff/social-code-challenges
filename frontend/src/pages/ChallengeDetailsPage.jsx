import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchChallengeDetails from '../hooks/useFetchChallengeDetails'

const ChallengeDetailsPage = () => {
  const { challenge_id: challengeId } = useParams()
  const { challengeDetails, isLoading } = useFetchChallengeDetails(challengeId)

  return <>
    {
      !isLoading && (
        <div>Challenge Details for Challenge {challengeId}
          <p>
            Title: {challengeDetails.name}
          </p>
          <p>
            Description: {challengeDetails.description}
          </p>
        </div>
      )
    }
  </>
}

export default ChallengeDetailsPage
