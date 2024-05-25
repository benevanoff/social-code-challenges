import React from 'react'
import { Link } from 'react-router-dom'
const ChallengeItem = (props) => {
  const { id, name, description, start_date: startDate, end_date: endDate } = props


  const formatDate = (dateStr) => {
    // Create a date object
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const monthName = date.toLocaleString('en-US', { month: 'short' });

    return `${monthName} ${day}, ${year}`;
  }
  // console.log(props)
  // Pass in the challenge_id to open link to challenge item page
  return (
    <div className='challenge-item'>
      <div className='challenge-item__text'>
        <h3 className='challenge-item__title'>{name}</h3>
        <div className='challenge-item__dates'>
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
        <p className='challenge-item__description'>{description}</p>
      </div>
      <Link to={`/challenges/${id}`}>

        <button className='button challenge-item__button'>View Challenge</button>
      </Link>

    </div>
  )
}

export default ChallengeItem
