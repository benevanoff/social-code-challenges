import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

import useFetchChallengeDetails from '../hooks/useFetchChallengeDetails'
import useFetchRegisteredUsers from '../hooks/useFetchRegisteredUsers'
import useFetchAllSubmissions from '../hooks/useFetchAllSubmissions'

import UserDataContext from '../context/UserDataContext'

import SubmissionLeaderboard from '../components/challenge-components/SubmissionLeaderboard'
import ChallengeDetails from '../components/challenge-components/ChallengeDetails'

const ChallengeDetailsPage = () => {
  const { challenge_id: challengeId } = useParams()
  const { userData } = useContext(UserDataContext)
  const [hasRepository, setHasRepository] = useState(false)

  const { challengeDetails, isLoading } = useFetchChallengeDetails(challengeId)
  const { isRegistered, isLoading: isRegisteredUsersLoading } = useFetchRegisteredUsers(challengeId)

  // This is for checking if the current user has already linked a code_repository to their submission.
  const { allSubmissions, isLoading: isAllSubmissionsLoading } = useFetchAllSubmissions(challengeId)

  useEffect(() => {
    if (!isAllSubmissionsLoading && allSubmissions) {
      const hasSubmissionWithoutRepo = allSubmissions.some(
        (submission) => submission.username === userData.username && submission.code_repository === null
      );
      setHasRepository(!hasSubmissionWithoutRepo);
    }
  }, [isAllSubmissionsLoading, allSubmissions]);


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

  console.log(challengeDetails)
  return <>
    <div className='challenge-details__page'>

      {
        !isLoading && (
          <ChallengeDetails challengeDetails={challengeDetails} userData={userData} >
            {
              hasRepository ? <button onClick={register}>Register</button> :
                <button>Link Project</button>
            }
          </ChallengeDetails>
        )
      }
    </div>


    <SubmissionLeaderboard></SubmissionLeaderboard>
  </>
}

export default ChallengeDetailsPage
