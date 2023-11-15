import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'

// styles
import './Create.css'

const Create = () => {
  // destructure documents from hook
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])


  const categories = [{ value: 'development', label: 'Development' }, { value: 'design', label: 'Design' }, { value: 'sales', label: 'Sales' }, { value: 'marketing', label: 'Marketing' }]



  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUser, setAssignedUser] = useState([])


  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate, category.value, assignedUser)
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
            <Select options={categories} onChange={(option) => setCategory(option)} />
          </label>
          <label>
            <span>Assign to:</span>
            <Select options={users} onChange={(option) => setAssignedUser(option)} isMulti />
          </label>
       <button className="btn">Add Project</button>
       </form>
       
    </div>
  )
}

export default Create
