import React from 'react'

const SubmissionItem = (props) => {
  return (
    <div className='submission-item'>
      <h3 className='submission-item__title'>
        {props.username}'s submission
      </h3>
      <p>Votes: </p>
    </div>
  )
}

export default SubmissionItem
