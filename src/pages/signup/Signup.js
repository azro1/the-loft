import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbNail, setThumbNail] = useState(null);
  const [thumbNailError, setThumbNailError] = useState('');

  // destructure useSignup hook
  const { error, isPending, signUp } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, displayName, thumbNail);
  };

  const handleFileChange = (e) => {
    setThumbNail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbNailError('You must choose a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbNailError('Selected file must be an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbNailError('Image file size must be less than 100kb');
      return;
    }

    setThumbNailError(null);
    setThumbNail(selected);
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Display name:</span>
        <input
          type='text'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input type='file' onChange={handleFileChange} />
        {thumbNailError && <div className='error'>{thumbNailError}</div>}
      </label>
      {error && <div className='error'>{error}</div>}
      {isPending && (
        <button className='btn' disabled>
          loading...
        </button>
      )}
      {!isPending && <button className='btn'>Sign up</button>}
    </form>
  );
}

export default Signup
