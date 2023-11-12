import { useState } from 'react'

// styles
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbNail, setThumbNail] = useState(null)

  return (
    <form className='auth-form'>
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
          <input type='password' value={password} onChange={(e) => setDisplayName(e.target.value)} />
       </label>
       <label>
          <span>Profile thumbnail:</span>
          <input type='file' />
       </label>
       <button className='btn'>Sign up</button>
    </form>
  )
}

export default Signup
