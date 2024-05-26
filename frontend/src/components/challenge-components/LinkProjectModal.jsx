import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const LinkProjectModal = ({ allSubmissions, userData }) => {
  const [linkProjectModalActive, setLinkProjectModalActive] = useState(false)
  const [userSubmissionId, setUserSubmissionId] = useState(null)
  const [projectLink, setProjectLink] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      getUserSubmissionId()
    }
  }, [])

  const getUserSubmissionId = () => {
    for (let submission of allSubmissions) {
      if (submission.username === userData.username)
        setUserSubmissionId(submission.submission_id)
    }
  }

  const toggleLinkProjectModal = () => {
    setLinkProjectModalActive(!linkProjectModalActive)
    console.log(linkProjectModalActive)
  }


  const requestBody = {
    "link": `${projectLink}`
  }

  const submitProject = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/challenges/submission/link_project/${userSubmissionId}`, requestBody, { withCredentials: true })
      if (response.status === 200) {
        console.log('Project Linked!')
        navigate(0)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (e) => {
    e.preventDefault();
    setProjectLink(e.target.value)
  };

  return <>
    <button className='button' onClick={toggleLinkProjectModal}>Link Project</button>
    {
      linkProjectModalActive && (
        <div className='link-project-modal'>
          <div className='link-project-modal__overlay' onClick={toggleLinkProjectModal} />
          <div className='link-project-modal__content'>
            <h3 className='link-project-modal__title'>Link Project Repository</h3>
            <label htmlFor='link-project-modal__input'>Project Link</label>
            <input name='link-project-modal__input' type='url' onChange={onChange} placeholder='Link to project repository' />
            <div className='link-project-modal__button-group'>
              <button className='button link-project-modal__button' type='submit' onClick={submitProject}>Submit</button>
              <button className='link-project-modal__close' onClick={toggleLinkProjectModal}>Close</button>
            </div>
          </div>
        </div>
      )

    }

  </>

}

export default LinkProjectModal
