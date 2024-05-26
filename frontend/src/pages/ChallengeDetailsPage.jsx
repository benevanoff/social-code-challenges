import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

import { useParams, useNavigate } from 'react-router-dom'

import useFetchChallengeDetails from '../hooks/useFetchChallengeDetails'
import useFetchRegisteredUsers from '../hooks/useFetchRegisteredUsers'
import useFetchAllSubmissions from '../hooks/useFetchAllSubmissions'

import UserDataContext from '../context/UserDataContext'

import SubmissionLeaderboard from '../components/challenge-components/SubmissionLeaderboard'
import ChallengeDetails from '../components/challenge-components/ChallengeDetails'
import LinkProjectModal from '../components/challenge-components/LinkProjectModal'

const ChallengeDetailsPage = () => {
  const { challenge_id: challengeId } = useParams()
  const { userData } = useContext(UserDataContext)
  const [hasRepository, setHasRepository] = useState(false)

  const { challengeDetails, isLoading } = useFetchChallengeDetails(challengeId)
  const { isRegistered } = useFetchRegisteredUsers(challengeId)

  // This is for checking if the current user has already linked a code_repository to their submission.
  const { allSubmissions, isLoading: isAllSubmissionsLoading } = useFetchAllSubmissions(challengeId)


  const navigate = useNavigate()
  useEffect(() => {
    if (!isAllSubmissionsLoading && allSubmissions) {
      // Search for user submission without repo
      const hasSubmissionWithoutRepo = allSubmissions.some(
        (submission) => submission.username === userData.username && submission.code_repository === null
      );
      setHasRepository(!hasSubmissionWithoutRepo);
    }
  }, [isAllSubmissionsLoading, allSubmissions]);


  const register = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/challenges/register/${challengeId}`, null, { withCredentials: true })
      if (response.status === 200) {
        console.log('Registration Success!')
        navigate(0)
      }
    } catch (error) {
      console.log(error.message)
    }
  }



  // If user is not registered, then show register button
  // Else show link project
  return <>
    <div className='challenge-details-page'>
      {
        !isLoading && (
          <ChallengeDetails challengeDetails={challengeDetails} userData={userData} >
            {
              isRegistered ?
                (hasRepository ?
                  <button className='button'>View Submission</button>
                  : <LinkProjectModal allSubmissions={allSubmissions} userData={userData} />
                )
                : <button className='button' onClick={register}>Register</button>
            }
          </ChallengeDetails>
        )
      }
      <SubmissionLeaderboard challengeId={challengeId} />
    </div>

  </>
}

export default ChallengeDetailsPage
