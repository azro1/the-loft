import { useState } from 'react'

// styles
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
       <h2>Login</h2>
       <label>
          <span>Email:</span>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
       </label>
       <label>
          <span>Password</span>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
       </label>
       <button>Login</button>
       {/* {error && <div className='error'>{error}</div>}
       {isPending && <button className='btn' disabled>loading...</button>}
       {!isPending && <button className='btn'>Login</button>} */}
    </form>
  )
}

export default Login
