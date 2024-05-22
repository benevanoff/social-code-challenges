import React from 'react'

const ChallengeItem = (props) => {
  const { name, description, start_date: startDate, end_date: endDate } = props

  return (
    <div className='challenge-item'>
      <h3 className='challenge-item--title'>{name}</h3>
      <p className='challenge-item--description'>{description}</p>
      <div className='challenge-item--dates'>
        {startDate}

        {endDate}
      </div>

    </div>
  )
}

export default ChallengeItem
