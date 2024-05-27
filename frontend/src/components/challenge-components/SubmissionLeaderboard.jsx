import React from 'react'
import SubmissionItem from './SubmissionItem'

import useFetchSubmissionLeaderboard from '../../hooks/useFetchSubmissionLeaderboard'

const SubmissionLeaderboard = ({ challengeId }) => {

  const { submissionLeaderboard, isLoading, error } = useFetchSubmissionLeaderboard(challengeId)
  return <>
    <div className='submission-leaderboard-container'>
      <h3 className='submission-leaderboard__heading'>Submission Leaderboard</h3>
      <div className='submission-leaderboard'>
        {
          (!isLoading && !error) ?
            (
              submissionLeaderboard.map((submission) => (
                <SubmissionItem key={submission.submission_id} {...submission} />
              )))
            :
            <div className='no-submissions'>No submissions for this Challenge</div>
        }

      </div>

    </div>
  </>
}

export default SubmissionLeaderboard
