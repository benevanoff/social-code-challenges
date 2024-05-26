import React from 'react'

const ChallengeDetails = ({ challengeDetails, children }) => {
  const { name, description, start_date, end_date } = challengeDetails

  const formatDate = (dateStr) => {
    // Create a date object
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const monthName = date.toLocaleString('en-US', { month: 'short' });

    return `${monthName} ${day}, ${year}`;
  }

  return (
    <div className='challenge-details'>
      <div className='challenge-details__title-group'>
        <h2 className='challenge-details__name'>{name}</h2>
        <span className='challenge-details__dates'>{formatDate(start_date)} - {formatDate(end_date)}</span>
      </div>
      <p className='challenge-details__description'>{description}</p>
      {children}
    </div>
  )
}

export default ChallengeDetails
