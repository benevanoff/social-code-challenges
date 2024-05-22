import React from 'react'
import useFetchAllChallenges from '../hooks/useFetchAllChallenges'
import ChallengeItem from '../components/challenge-components/ChallengeItem'


const ChallengesPage = () => {
  // Call useFetchAllChallenges Hook then render results
  const { allChallengesData, isLoading, error } = useFetchAllChallenges()
  return (
    <div className='challenges-page'>
      <h2 className='challenges-page--title'>Challenges</h2>
      {
        // If done loading, pass in data and render
        !isLoading && (
          <div className='challenges--container'>
            {allChallengesData.map((challengeData) => (
              <ChallengeItem key={challengeData.id} {...challengeData} />
            ))}
          </div>
        )
      }
    </div>
  )
}

export default ChallengesPage
