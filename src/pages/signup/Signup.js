import { useState } from 'react'

// styles
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbNail, setThumbNail] = useState(null)
  const [thumbNailError, setThumbNailError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password, displayName, thumbNail)
  }

  const handleFileChange = (e) => {
    setThumbNail(null)
    let selected = e.target.files[0]
    
    if (!selected) {
       setThumbNailError('You must choose a file')
       return
    } 
    if (!selected.type.includes('image')) {
       setThumbNailError('Selected file must be an image')
       return
    }
    if (selected.size > 100000) {
       setThumbNailError('Image file size must be less than 100kb')
       return
    }
 
    setThumbNailError(null)
    setThumbNail(selected)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
       <h2>Sign up</h2>
       <br />
       <label>
          <span>Email:</span>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
       </label>
       <label>
          <span>Display name:</span>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
       </label>
       <label>
          <span>Password</span>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
       </label>
       <label>
          <span>Profile thumbnail:</span>
          <input type='file' onChange={handleFileChange} />
          {thumbNailError && <div className='error'>{thumbNailError}</div>}
       </label>
       <button className='btn'>Sign up</button>
    </form>
  )
}

export default Signup
