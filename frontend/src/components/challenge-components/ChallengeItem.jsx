import React from 'react'
import { Link } from 'react-router-dom'
const ChallengeItem = (props) => {
  const { id, name, description, start_date: startDate, end_date: endDate } = props

  // console.log(props)
  // Pass in the challenge_id to open link to challenge item page
  return (
    <div className='challenge-item'>
      <h3 className='challenge-item--title'>{name}</h3>
      <p className='challenge-item--description'>{description}</p>
      <div className='challenge-item--dates'>
        {startDate}

        {endDate}
      </div>
      <Link to={`/challenges/${id}`}>

        <button>View</button>
      </Link>

    </div>
  )
}

export default ChallengeItem
