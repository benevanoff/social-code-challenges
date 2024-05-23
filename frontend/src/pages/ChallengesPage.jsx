import React from 'react'
import useFetchAllChallenges from '../hooks/useFetchAllChallenges'
import ChallengeItem from '../components/challenge-components/ChallengeItem'


const ChallengesPage = () => {
  const { allChallengesData, isLoading } = useFetchAllChallenges()
  return (
    <div className='challenges-page'>
      <h2 className='challenges-page--title'>Challenges</h2>
      {
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
