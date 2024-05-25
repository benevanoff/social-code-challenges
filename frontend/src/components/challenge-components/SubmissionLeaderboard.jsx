import React from 'react'
import SubmissionItem from './SubmissionItem'

import useFetchSubmissionLeaderboard from '../../hooks/useFetchSubmissionLeaderboard'

const SubmissionLeaderboard = ({ challengeId }) => {

  const { submissionLeaderboard, isLoading } = useFetchSubmissionLeaderboard(challengeId)
  return <>

    <div>

      {
        (!isLoading && submissionLeaderboard !== null) &&
        submissionLeaderboard.map((submission) => (
          <SubmissionItem key={submission.submission_id} {...submission} />
        ))
      }
    </div>
  </>
}

export default SubmissionLeaderboard
