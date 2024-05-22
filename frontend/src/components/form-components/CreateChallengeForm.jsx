import React, { useState } from 'react'
import axios from 'axios'

import FormInput from './FormInput'

const CreateChallengeForm = () => {

  const [challengeData, setChallengeData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: ''
  })

  const currentDate = new Date()
  const formattedDate = currentDate.toJSON().slice(0, 10)


  const createChallengeInputs = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Challenge Title',
      label: 'Title',
    },
    {
      name: 'description',
      label: "Description"
    },
    {
      name: 'start_date',
      type: 'date',
      label: 'Start Date',
      min: formattedDate

    },
    {
      name: 'end_date',
      type: 'date',
      label: 'End Date',
      min: formattedDate
    }
  ]

  const onChange = (e) => {
    e.preventDefault()
    setChallengeData({
      ...challengeData,
      [e.target.name]: e.target.value,
    })
  }

  const convertToTimestamp = (date) => {
    return Math.floor(new Date(date).getTime() / 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const startDate = convertToTimestamp(challengeData.start_date)
    const endDate = convertToTimestamp(challengeData.end_date)

    try {
      const response = await axios.post(
        'http://localhost:8000/challenges/create',
        {
          name: challengeData.name,
          description: challengeData.description,
          start_date: startDate,
          end_date: endDate
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        },
      )

      if (response.status === 200) {
        console.log('Challenge Created Successfully')
      }

    } catch (error) {
      console.log(error.message)

    }
  }

  return (
    <div className='create-challenge-form--container'>
      <h3 className='create-challenge-form--heading'>Create Challenge</h3>
      <form className='create-challenge-form'>
        <FormInput {...createChallengeInputs[0]} onChange={onChange} />
        <div>
          <label htmlFor='description'>Description</label>
          <textarea name={createChallengeInputs[1].name} className='challenge-description' onChange={onChange} placeholder='Write a short description of the project...'></textarea>
        </div>
        <div className='create-challenge-form--dates'>
          <FormInput {...createChallengeInputs[2]} onChange={onChange} min={formattedDate} />
          <FormInput {...createChallengeInputs[3]} onChange={onChange} min={formattedDate} />
        </div>
      </form>
      <button type='submit' className='create-challenges-form--submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default CreateChallengeForm
