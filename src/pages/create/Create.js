import { useState } from 'react'

// styles
import './Create.css'

const Create = () => {
  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUser, setAssignedUser] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate)
  }

  return (
    <div className='create-form'>
       <h2 className='page-title'>Create a new project</h2>
       <form onSubmit={handleSubmit}>
          <label>
            <span>Project name:</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            <span>Project details:</span>
            <textarea type="text" value={details} onChange={(e) => setDetails(e.target.value)} required ></textarea>
          </label>
          <label>
            <span>Set due date:</span>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </label>
          <label>
            <span>Project category:</span>
            {/* category select dropdown here */}
          </label>
          <label>
            <span>Assign to:</span>
            {/* assignee select dropdown here */}
          </label>
       <button className="btn">Add Project</button>
       </form>
       
    </div>
  )
}

export default Create
