import React from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

import useFetchChallengeDetails from '../hooks/useFetchChallengeDetails'
import useFetchRegisteredUsers from '../hooks/useFetchRegisteredUsers'
import useFetchAllSubmissions from '../hooks/useFetchAllSubmissions'

import SubmissionItem from '../components/challenge-components/SubmissionItem'
import useFetchSubmissionLeaderboard from '../hooks/useFetchSubmissionLeaderboard'

const ChallengeDetailsPage = () => {
  const { challenge_id: challengeId } = useParams()

  const { challengeDetails, isLoading } = useFetchChallengeDetails(challengeId)
  const { isRegistered, isLoading: isRegisteredUsersLoading } = useFetchRegisteredUsers(challengeId)
  const { submissionLeaderboard, isLoading: isSubmissionLeaderboardLoading } = useFetchSubmissionLeaderboard(challengeId)

  // This is for checking if the current user has already linked a code_repository to their submission.
  // const { allSubmissions, isLoading: isAllSubmissionsLoading } = useFetchAllSubmissions(challengeId)

  if (!isRegisteredUsersLoading)
    console.log('Is Registered ' + isRegistered)
  // Check if user registered for challenge.



  // If user is not registered, then show register button
  // If yes show submit button

  const register = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/challenges/register/${challengeId}`, null, { withCredentials: true })

      if (response.status === 200) {
        console.log('Registration Success!')
      }

    } catch (error) {
      console.log(error.message)
    }

  }
  return <>
    {
      !isLoading && (
        <div className='challenge-details'>
          Challenge Number {challengeId}
          <p>Title: {challengeDetails.name}</p>
          <p>Description: {challengeDetails.description}</p>
          <button onClick={register}>Register</button>
        </div>
      )
    }

    {
      (!isSubmissionLeaderboardLoading && submissionLeaderboard) && (
        <div>
          top submissions
          {submissionLeaderboard.map((submission) => (
            <SubmissionItem {...submission} key={submission.submission_id} />
          ))}
        </div>
      )
    }
  </>
}

export default ChallengeDetailsPage
