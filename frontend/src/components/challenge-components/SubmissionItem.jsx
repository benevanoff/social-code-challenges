import React from 'react'

const SubmissionItem = (props) => {
  console.log(props)
  return (
    <div>
      submission item by {props.username}
      <p>code repo: {props.code_repository}</p>
    </div>
  )
}

export default SubmissionItem
