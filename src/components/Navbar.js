import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import door from '../assets/door.svg'
import './Navbar.css'

const Navbar = () => {
// destructure useLogout hook
const { isPending, logout } = useLogout()
const { user } = useAuthContext()

  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <img src={door} alt='an open door' />
          <span>The Office</span>
        </li>
        {!user && (
          <>
            <li><Link to='/login'replace>Login</Link></li>
            <li><Link to='/signup' replace>Signup</Link></li>
          </>
        )}
        {user && (
          <li>
            {!isPending && <button className='btn' onClick={logout} >Logout</button>}
            {isPending && <button className='btn' disabled >Loggin out...</button>}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar
