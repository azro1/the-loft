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
          <span>The Loft</span>
        </li>
        {!user && (
          <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/Signup'>Signup</Link></li>
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
